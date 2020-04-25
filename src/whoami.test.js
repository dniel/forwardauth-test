import http from "k6/http";
import encoding from "k6/encoding";
import {check, group} from "k6";
import {baseFqdn, clientId, clientSecret, options} from "./common.js";

// Export options object so k6 can access it
export {options};

/**
 * Test that the whoami service is protected
 * without credentials.
 * TODO: add check for correct redirect url.
 */
function whoamiUnauthenticated() {
    const url = `https://whoami.${baseFqdn}`
    let res = http.get(url, {follow: false, redirects: 0});
    check(res, {
        "status is 307": (r) => r.status === 307,
    });
}

/**
 * Test that the whoami service is available
 * with credentials
 */
function whoamiAuthenticated() {
    const url = `https://whoami.${baseFqdn}`
    const options = {
        headers: {
            "Authorization": "Basic " + encoding.b64encode(`${clientId}:${clientSecret}`)
        }
    };

    // test url call.
    let res = http.get(url, options);

    check(res, {
        "status is 200": (r) => r.status === 200,
        "has JWT Bearer Token": (r) => r.body.match("Authorization: Bearer ([a-zA-Z0-9\\-_]+?\\.[a-zA-Z0-9\\-_]+?\\.[a-zA-Z0-9\\-_]+)")
    });
}

export default function () {
    group("Whoami: Unauthenticated", whoamiUnauthenticated);
    group("Whoami: Authenticated", whoamiAuthenticated);
};
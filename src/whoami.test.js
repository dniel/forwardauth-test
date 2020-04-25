import http from "k6/http";
import {check, group, sleep} from "k6";
import {baseFqdn, options, thinktime2} from "./common.js";

// Export options object so k6 can access it
export {options};

/**
 * Test that the whoami service is protected.
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
 * Test that the whoami service is protected.
 */
function whoamiAuthenticated() {
    const url = `https://whoami.${baseFqdn}`
    let res = http.get(url, {follow: false, redirects: 0});
    check(res, {
        "status is 200": (r) => r.status === 200,
    });
}

export default function () {
    group("Whoami: Unauthenticated", whoamiUnauthenticated);
    group("Whoami: Authenticated", whoamiAuthenticated);
};
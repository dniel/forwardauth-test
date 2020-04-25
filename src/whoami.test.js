import http from "k6/http";
import {check, group, sleep} from "k6";
import {baseFqdn, options, thinktime2} from "./common.js";

// Export options object so k6 can access it
export {options};

/**
 * test that the whoami service is protected.
 */
function whoamiUnauthenticated() {
    const url = `https://whoami.${baseFqdn}`
    let res = http.get(url, {follow: false, redirects: 0});
    check(res, {
        "status is 307, redirected for login": (r) => r.status === 307,
    });
}

export default function () {
    group("Whoami: Unauthenticated", whoamiUnauthenticated);
    sleep(thinktime2);
};
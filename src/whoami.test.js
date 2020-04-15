import http from "k6/http";
import {check, group, sleep} from "k6";
import {myTrend, options, thinktime1, thinktime2, urlbase} from "./common.js";
import { login } from "./login.test.js";

// Export options object so k6 can access it
export {options};

// test credentials, should be fetched from secrets instead in Amazon Secrets manager.
let username = __ENV.CLIENT_ID;
let password = __ENV.CLIENT_SECRET;

// Access token to call API.
let access_token = null;

// This function contains the code to actually exercise the /tokens end point
// We export it in case another test wants to use this end point also
export function whoami(token) {
    var url = `https://${urlbase}/get`
    return http.get(url);
}

// This is the "run" function that k6 will call again and again during a load test, or one single
// time when we're running a functional test (1 VU, 1 iteration).
export default function () {
    if (access_token === null) {
        var res = login(username, password);
    }

    // Below is the actual test case for the /tokens API endpoint
    group("whoami", function () {
        var res = whoami(access_token);
        check(res, {
            "status is 200": (res) => res.status === 200
        });
        myTrend.add(res.timings.duration);
        sleep(thinktime1);
    });
    sleep(thinktime2);
};
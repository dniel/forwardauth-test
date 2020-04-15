import http from "k6/http";
import {check, group, sleep} from "k6";
import {myTrend, options, thinktime1, urlbase} from "./common.js";

export {options};

// test credentials, should be fetched from secrets instead in Amazon Secrets manager.
let username = "user";
let password = "passwd";

// We export this function as other test cases might want to use it to authenticate
export function login(username, password) {
    const credentials = `${username}:${password}`;
    // Passing username and password as part of the URL will
    // allow us to authenticate using HTTP Basic Auth.
    const url = `https://${credentials}@${urlbase}/basic-auth/${username}/${password}`;
    return http.get(url);
}

// Exercise /loginTest endpoint when this test case is executed
export default function () {
    group("loginTest", function () {
        var res = login(username, password);
        // Verify response
        check(res, {
            'status is 200': r => r.status === 200,
            'is authenticated': r => r.json().authenticated === true,
            'is correct user': r => r.json().user === username,
        });

        myTrend.add(res.timings.duration);
        sleep(thinktime1);
    });
};
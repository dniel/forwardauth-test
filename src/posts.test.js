import http from "k6/http";
import encoding from "k6/encoding";
import {check, group} from "k6";
import {baseFqdn, clientId, clientSecret, options, whatIsIt} from "./common.js";

// Export options object so k6 can access it
export {options};

// Common options with credentials.
const httpOptions = {
    headers: {
        "Authorization": "Basic " + encoding.b64encode(`${clientId}:${clientSecret}`)
    }
};

/**
 * Main Tests start function that will be called from main.js
 */
export default function () {
    group("API Posts: Unauthenticated", postsUnauthenticated);
    group("API Posts: Authenticated", postsAuthenticated);
    group("API Posts: Get All Posts", postsAllPosts);
    group("API Posts: Get One Post", postsOnePost);
    group("API Posts: Info", postsHasInfoEndpoint);
    group("API Posts: Health", postsHasHealthEndpoint);
    group("API Posts: Config", postsHasConfigEndpoint);
};


/**
 * Test that the whoami service is protected
 * without credentials.
 */
function postsUnauthenticated() {
    const url = `https://api-posts.${baseFqdn}/posts`
    let res = http.get(url, {follow: false, redirects: 0});
    check(res, {
        "status is 307": (r) => r.status === 307,
        "should redirect to Auth0 login page": (r) => r.headers["Location"].startsWith("https://dniel.eu.auth0.com/authorize")
    });
}

/**
 * Test that the Posts service is available
 * with credentials
 */
function postsAuthenticated() {
    // given url to posts
    const url = `https://api-posts.${baseFqdn}/posts`

    // when calling the url
    let res = http.get(url, httpOptions);

    // then
    check(res, {
        "status is 200": (r) => r.status === 200,
    });
}

/**
 * Test that the Posts service is available
 * with credentials
 */
function postsAllPosts() {
    // given url to posts
    const url = `https://api-posts.${baseFqdn}/posts`

    // when calling the url
    let res = http.get(url, httpOptions);

    // then
    check(res, {
        "status is 200": (r) => r.status === 200,
        "content type is application/vnd.siren+json": (r) => r.headers['Content-Type'] === "application/vnd.siren+json",
        "content has entities": (res) => JSON.parse(res.body).hasOwnProperty('entities'),
        "content has properties": (res) => JSON.parse(res.body).hasOwnProperty('properties'),
        "content has class": (res) => JSON.parse(res.body).hasOwnProperty('class'),
        "response is json object": (r) => whatIsIt(r.json()) === "Object"
    });
}

/**
 * Test that the Posts service is available
 * with credentials
 */
function postsOnePost() {
    // given url to posts
    const url = `https://api-posts.${baseFqdn}/posts/1`

    // when calling the url
    let res = http.get(url, httpOptions);

    // then
    check(res, {
        "status is 200": (r) => r.status === 200,
        "content type is application/vnd.siren+json": (r) => r.headers['Content-Type'] === "application/vnd.siren+json",
        "content has properties": (res) => JSON.parse(res.body).hasOwnProperty('properties'),
        "content has class": (res) => JSON.parse(res.body).hasOwnProperty('class'),
        "response is json object": (r) => whatIsIt(r.json()) === "Object"
    });
}

/**
 * Test that the Posts service is available
 * with credentials
 *
 * TODO: Should have been siren contenttype.
 */
function postsHasHealthEndpoint() {
    // given url to posts
    const url = `https://api-posts.${baseFqdn}/system/health`

    // when calling the url
    let res = http.get(url, httpOptions);

    // then
    check(res, {
        "status is 200": (r) => r.status === 200,
        "content type is application/json": (r) => r.headers['Content-Type'] === "application/json",
        "content is UP": (r) => r.json().status === "UP",
        "response is json object": (r) => whatIsIt(r.json()) === "Object"
    });
}

/**
 * Test that the Posts service is available
 * with credentials
 * TODO: Should have been siren contenttype.
 */
function postsHasInfoEndpoint() {
    // given url to posts
    const url = `https://api-posts.${baseFqdn}/system/info`

    // when calling the url
    let res = http.get(url, httpOptions);

    // then
    check(res, {
        "status is 200": (r) => r.status === 200,
        "content type is application/json": (r) => r.headers['Content-Type'] === "application/json",
        "response is json object": (r) => whatIsIt(r.json()) === "Object"
    });
}

/**
 * Test that the Posts service is available
 * with credentials
 * TODO: Should have been siren contenttype.
 */
function postsHasConfigEndpoint() {
    // given url to posts
    const url = `https://api-posts.${baseFqdn}/system/config`

    // when calling the url
    let res = http.get(url, httpOptions);
    console.log(res.body)

    // then
    check(res, {
        "status is 200": (r) => r.status === 200,
        "content type is application/json": (r) => r.headers['Content-Type'] === "application/json",
        "response is json object": (r) => whatIsIt(r.json()) === "Object"
    });
}

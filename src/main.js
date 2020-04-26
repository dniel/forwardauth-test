import {options} from "./common.js";
import whoamiTest from "./whoami.test.js";
import postsTest from "./posts.test.js";

export {options};

/**
 * Main class to start all tests.
 */
export default function () {
    whoamiTest()
    postsTest()
};
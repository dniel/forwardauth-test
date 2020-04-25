import {options} from "./common.js";
import whoamiTest from "./whoami.test.js";

export {options};

/**
 * Main class to start all tests.
 */
export default function () {
    whoamiTest()
};
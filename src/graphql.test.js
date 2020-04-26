import http from "k6/http";
import encoding from "k6/encoding";
import {check, group} from "k6";
import {baseFqdn, clientId, clientSecret, options} from "./common.js";

// Export options object so k6 can access it
export {options};
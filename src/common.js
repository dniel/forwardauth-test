import {Counter, Trend} from "k6/metrics";

// Default runtime options
export const options = {
    vus: 1,
    thresholds: {
        checks: ["rate == 1.0"], // all checks should pass.
        transaction_time: ["avg<500"], // Require transaction_time's average to be <1000ms
        http_req_duration: ["avg<1000"], // Require http_req_duration's average to be <2000ms
    }
};

// Create a Trend metric to hold transaction time data samples from the HTTP calls to the various end points
// Please see note below about this metric and the thresholds set in 'options' above
export const myTrend = new Trend("transaction_time");

// baseHostname that we prepend to all URLs we use
export const baseFqdn = `${__ENV.BASE_FQDN}`;

// credentials
export const clientId = `${__ENV.CLIENT_ID}`;
export const clientSecret = `${__ENV.CLIENT_SECRET}`;

// Think times, to slow down execution somewhat
export const thinktime1 = 0.1;
export const thinktime2 = 2.0;

const stringConstructor = "test".constructor;
const arrayConstructor = [].constructor;
const objectConstructor = ({}).constructor;

export function whatIsIt(object) {
    if (object === null) {
        return "null";
    }
    if (object === undefined) {
        return "undefined";
    }
    if (object.constructor === stringConstructor) {
        return "String";
    }
    if (object.constructor === arrayConstructor) {
        return "Array";
    }
    if (object.constructor === objectConstructor) {
        return "Object";
    }
    {
        return "don't know";
    }
}

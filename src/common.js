import {Trend} from "k6/metrics";

// Default runtime options
export let options = {
    vus: 1,
    thresholds: {
        errors: ["rate<0.1"], // <10% errors
        transaction_time: ["avg<1000"], // Require transaction_time's average to be <1000ms
        http_req_duration: ["avg<2000"], // Require http_req_duration's average to be <2000ms
    }
};

// Create a Trend metric to hold transaction time data samples from the HTTP calls to the various end points
// Please see note below about this metric and the thresholds set in 'options' above
export let myTrend = new Trend("transaction_time");

// baseHostname that we prepend to all URLs we use
export let baseFqdn = `${__ENV.BASE_FQDN}`;

// credentials
export let clientId = `${__ENV.CLIENT_ID}`;
export let clientSecret = `${__ENV.CLIENT_SECRET}`;

// Think times, to slow down execution somewhat
export let thinktime1 = 0.1;
export let thinktime2 = 2.0;
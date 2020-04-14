import http from "k6/http";
import { check } from "k6";
import { Rate } from "k6/metrics";

// make tests fail if failure rate from tests is above thresholds
// will make k6 return exit code 99 to signal that the tests has failed.
export let errorRate = new Rate("errors");
export let options = {
  thresholds: {
    errors: ["rate<0.1"] // <10% errors
  }
};

export default function() {
  const res = http.get("http://httpbin.org");
  const result = check(res, {
    "status is 200": r => r.status == 200
  });
  errorRate.add(!result);
}

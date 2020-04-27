# Forwardauth Tests
This repo contains integration and smoketest to run against the enviroment as part of the deployment pipeline.

## Requirements
- docker
- k6
- npm

## Development
Tests for K6 is written in Javascript and to be ble to use external dependencies and bundle all the code into 
a single file webpack is used. Build the code using `npm run bundle`. The resulting files is in `dist` directory.

Set the following environment variables to make the tests work
For authentication in tests against Auth0 using client credentials, the following variables is needed.
- CLIENT_ID, from integration test app in Auth0.
- CLIENT_SECRET, from integration test app in Auth0.

For calling the right environment through the Traefik load balancer.
- BASE_FQDN, ex. dniel.se (no protocol)

To run the tests locally without using a docker container, install `k6` locally and run `k6 run dist/main.js`
which will start all tests.
  
## Building
When committing code to the repository Travis will start a build, bundle the code and build a Docker 
image of the build, the resulting docker image will be pushed to our dockerhub image repository.

## Pipeline
When running in the pipeline the latest image of `forwardauth-test` will be started by the Spinnaker 
pipeline in Kubernetes as a K8s Job which will be removed after completion. 

The script `run_tests.sh` will start and run the `main.js` suite fo tests.

## Tech
- K6 test tool
- Javascript
- Docker
- Spinnaker

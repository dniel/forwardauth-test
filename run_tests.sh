#!/bin/sh
##################################
# Run integration tests.
# Mandatory environment variables.
# - CLIENT_ID
# - CLIENT_SECRET
# - BASE_FQDN
##################################

### params
echo "--- Echo parameters:"
echo $CLIENT_ID
echo $BASE_FQDN
echo "--- EOF"

# Run tests
k6 run /dist/main.js "$@"
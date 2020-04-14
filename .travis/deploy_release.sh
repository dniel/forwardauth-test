#!/bin/bash
echo "Push new docker image for RELEASE $BRANCH to DockerHub."
echo "$DOCKER_PASSWD" | docker login -u "$DOCKER_USER" --password-stdin

echo "Create Tags for Image: $TRAVIS_TAG, $BRANCH and latest"
docker tag dniel/forwardauth-test dniel/forwardauth-test:$APP_VERSION-$BRANCH
docker tag dniel/forwardauth-test dniel/forwardauth-test:$BRANCH
docker tag dniel/forwardauth-test dniel/forwardauth-test:latest

echo "Push tags $TRAVIS_TAG, $BRANCH and latest to DockerHub."
docker push dniel/forwardauth-test:$APP_VERSION-$BRANCH
docker push dniel/forwardauth-test:$BRANCH
docker push dniel/forwardauth-test:latest

echo "Tag release on Git to know that this commit has been released."
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"
git tag "v$APP_VERSION"
git push https://$GH_TOKEN@github.com/dniel/forwardauth-test "v$APP_VERSION"
echo "DONE"
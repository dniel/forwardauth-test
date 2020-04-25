FROM loadimpact/k6

# default environment variables used if not overriden by commandline parameters
ENV BASE_FQDN=httpbin.org
ENV CLIENT_ID=user
ENV CLIENT_SECRET=passwd

# run as root user
USER root

# Install AWS CLI (not in use yet)
# Install JQ JSON tool.
RUN apk -v --update add \
        python \
        py-pip \
        groff \
        less \
        mailcap \
        jq \
        && \
    pip install --upgrade awscli==1.14.5 s3cmd==2.0.1 python-magic && \
    apk -v --purge del py-pip && \
    rm /var/cache/apk/*

# copy everything needed for test.
COPY /dist/* /dist/
COPY /run_tests.sh /run_tests.sh

# Start tests.
ENTRYPOINT [ "./run_tests.sh" ]

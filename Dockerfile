FROM loadimpact/k6

# default environment variables used if not overriden by commandline parameters
ENV BASEURL=httpbin.org
ENV CLIENT_ID=user
ENV CLIENT_SECRET=passwd

# run as root user
USER root

# copy everything
COPY /dist/* /dist/

ENTRYPOINT [ "k6" ]
CMD [ "help" ]

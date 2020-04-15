FROM loadimpact/k6

# default baseurl to use if none specified on the docker commandline.
ENV BASEURL=httpbin.org

# run as root user
USER root

# copy everything
COPY /dist/* /dist/

ENTRYPOINT [ "k6" ]
CMD [ "help" ]

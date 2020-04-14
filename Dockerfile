FROM loadimpact/k6

# run as root user
USER root

# copy everything
COPY /scripts /scripts
COPY /tests /tests

ENTRYPOINT [ "k6" ]
CMD [ "help" ]

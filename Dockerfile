FROM loadimpact/k6

USER root

# copy everything
COPY /scripts /scripts
COPY /tests /tests

ENTRYPOINT [ "k6" ]
CMD [ "run", "/tests/e2e/http_get.js"]

FROM loadimpact/k6

# run as root user
USER root

# copy everything
COPY /build/app.bundle.js /app.bundle.js

ENTRYPOINT [ "k6" ]
CMD [ "help" ]

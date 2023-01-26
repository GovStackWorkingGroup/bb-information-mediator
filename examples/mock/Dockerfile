FROM node:14-alpine

RUN npm install -g @mockoon/cli@2.2.1
COPY mockoon-bb-information-mediator.json ./mockoon-bb-information-mediator.json

# Do not run as root.
RUN adduser --shell /bin/sh --disabled-password --gecos "" mockoon
RUN chown -R mockoon ./mockoon-bb-information-mediator.json
USER mockoon

EXPOSE 3003

ENTRYPOINT ["mockoon-cli", "start", "--hostname", "0.0.0.0", "--daemon-off", "--data", "mockoon-bb-information-mediator.json", "--container"]

# Usage: docker run -p <host_port>:<container_port> mockoon-test
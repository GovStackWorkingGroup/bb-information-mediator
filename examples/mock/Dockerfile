FROM node:14-alpine

RUN npm install -g @mockoon/cli@2.2.1
COPY mockoon-bb-information-mediator.json ./mockoon-bb-information-mediator.json
COPY entrypoint.sh ./entrypoint.sh
# Do not run as root.
RUN adduser --shell /bin/sh --disabled-password --gecos "" mockoon
RUN chown -R mockoon ./mockoon-bb-information-mediator.json
RUN chown -R mockoon ./entrypoint.sh

USER mockoon

EXPOSE 3003
RUN ls

ENTRYPOINT ["/entrypoint.sh"]

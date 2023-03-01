FROM caddy:latest
  
# Install python
#RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python

# Configure Caddy in the image build, so we don't rely on persistent volumes.
COPY Caddyfile /etc/caddy/Caddyfile

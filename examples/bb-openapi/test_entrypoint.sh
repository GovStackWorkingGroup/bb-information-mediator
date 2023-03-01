#! /usr/bin/env bash

cp .env.example .env && docker-compose up -d
echo "Get environment running..."

# wait for port 4000 to be functional
until curl -k https://localhost:4000 >/dev/null 2>&1
do sleep 1; done
echo "Ready. Continuing with setup"

# Fix Caddy cert issue
ansible-playbook fix-caddy-cert.yml -i inventory-docker.yml

# Initialize IM security server
ansible-playbook setup-im.yml -i inventory-docker.yml
echo "IM initialization finished"

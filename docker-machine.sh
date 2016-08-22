#!/bin/bash
export DOTOKEN=your-api-token

docker-machine create --driver digitalocean \
--digitalocean-access-token $DOTOKEN \
--digitalocean-region lon1 \
--digitalocean-image coreos-alpha \
--digitalocean-ssh-user core \
coreos-alpha

docker-machine ssh coreos-alpha docker run --name=kuwit --restart=always -e WIT_TOKEN=WIT_TOKEN -p 80:8000 enxebre/kuwit
#!/bin/bash

cd infoprop-front && yarn && yarn build
cd ..
rm -rf infoprop-api/public/
cp -r infoprop-front/build infoprop-api/public

$(aws ecr get-login --no-include-email --region us-east-2)
docker build -t infoprop ./infoprop-api
docker tag infoprop:latest 344287129195.dkr.ecr.us-east-2.amazonaws.com/infoprop:latest
docker push 344287129195.dkr.ecr.us-east-2.amazonaws.com/infoprop:latest
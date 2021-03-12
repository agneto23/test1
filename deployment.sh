# !/bin/bash

set -e

echo "Deploying"

echo $ACCOUNT_KEY > ${HOME}/gcloud-service-key.json

gcloud components update

gcloud auth activate-service-account $ACCOUNT_ID --key-file ${HOME}/gcloud-service-key.json

gcloud config set project winter-cogency-307316

gcloud --quiet config set container/cluster test-cluster

gcloud config set compute/zone us-central1-a

gcloud --quiet container clusters get-credentials test-cluster

gcloud auth configure-docker us-central1-docker.pkg.dev

#docker build -t gcr.io/test-251421/test:$CIRCLE_SHA1 .
docker build -t us-central1-docker.pkg.dev/winter-cogency-307316/test-registry/test:1.0.0 .

docker push us-central1-docker.pkg.dev/winter-cogency-307316/test-registry/test:1.0.0

#kubectl set image deployment/test test=gcr.io/test-251421/test:$CIRCLE_SHA1
kubectl apply --validate=true -f admin/

echo " Successfully deployed"

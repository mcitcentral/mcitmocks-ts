#!/bin/sh

yarn db:deploy
yarn db:generate
yarn db:seed
cd client && yarn && yarn build
cd ..
yarn start

exec "$@"
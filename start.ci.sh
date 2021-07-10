#!/bin/sh

yarn db:reset --force
yarn db:generate
cd client && yarn && yarn build
cd ..
yarn start

exec "$@"
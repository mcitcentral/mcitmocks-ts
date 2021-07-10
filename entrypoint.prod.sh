#!/bin/sh

 yarn db:migrate
 yarn db:generate
 cd client && yarn && yarn build
 cd ..
 yarn start

 exec "$@"
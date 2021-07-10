#!/bin/sh

yarn db:migrate
exec "$@"
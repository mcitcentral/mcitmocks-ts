FROM node:14-alpine

ENV APP_HOME="/home/app/mcitmocks-client"

RUN mkdir -p ${APP_HOME} && chown -R node:node ${APP_HOME}

WORKDIR ${APP_HOME}

COPY package*.json ./
RUN yarn

COPY . .

EXPOSE 3000

CMD yarn start
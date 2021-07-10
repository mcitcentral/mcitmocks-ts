FROM node:14-alpine

ENV APP_HOME="/home/app/mcitmocks"

RUN mkdir -p ${APP_HOME} && chown -R node:node ${APP_HOME}

WORKDIR ${APP_HOME}

COPY package*.json ./
RUN yarn

COPY . . 

EXPOSE 8000

RUN yarn db:generate

RUN if [ "$ENV" = "production" ] ; then cd client && yarn build; fi

RUN chmod +x entrypoint.sh
ENTRYPOINT [ "sh", "entrypoint.sh" ]

CMD if [ "$ENV" = "production" ] ; then yarn start; else yarn dev; fi
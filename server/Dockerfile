FROM node:14

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn

COPY ./build/cjs .

EXPOSE ${CRIBBAGE_SERVER_PORT}

CMD ["node", "index.js"]

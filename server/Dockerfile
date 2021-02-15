FROM node:14

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn

COPY ./build/cjs .

EXPOSE 8080

CMD ["node", "index.js"]

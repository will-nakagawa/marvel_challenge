FROM node:lts-alpine

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN rm -rf node_modules

RUN npm install

CMD "npm" "start"

EXPOSE 4000:4000
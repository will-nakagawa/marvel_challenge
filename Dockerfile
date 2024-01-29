FROM node:lts-alpine

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN rm -rf dist
RUN rm -rf node_modules

RUN npm install

RUN npx tsc --build

CMD "npm" "start"

EXPOSE 4000
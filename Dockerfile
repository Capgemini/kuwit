FROM node:6.3-slim
MAINTAINER Alberto.garcial@hotmail.com

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app

ENV NODE_ENV production
RUN npm run build:prod

EXPOSE 8000
CMD ["npm", "run", "start:prod"]

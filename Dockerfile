FROM node:8-slim

WORKDIR /starter
ENV NODE_ENV development

COPY package.json /starter/package.json

RUN npm install

COPY .env.example /starter/.env.example
COPY . /starter

EXPOSE 8080

CMD ["npm","start"]



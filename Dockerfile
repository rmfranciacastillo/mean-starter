FROM node:10

WORKDIR /usr/src/mean-starter

COPY package.json /usr/src/mean-starter/package.json

RUN npm install

COPY . . 

EXPOSE 8080

CMD ["npm","start"]



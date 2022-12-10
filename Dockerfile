#base image
FROM node:16-alpine

WORKDIR /app

COPY package*.json yarn.locak ./

RUN npm install

COPY . .

RUN npm test

EXPOSE 3000


CMD [ "npm", "run", "dev" ]


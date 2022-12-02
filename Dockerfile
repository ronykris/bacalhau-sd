# Build dependencies
FROM node:19.2-alpine as dependencies
WORKDIR /app
COPY package.json .
RUN npm i
RUN apk update \
&& apk add curl bash openssl
RUN curl -sL https://get.bacalhau.org/install.sh | bash
COPY . . 
# Build production image
FROM dependencies as builder
EXPOSE 3080
CMD npm run start
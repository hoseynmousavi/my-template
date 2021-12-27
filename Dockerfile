FROM node:lts AS base

WORKDIR /app

COPY ./package.json .

RUN npm i --legacy-peer-deps

RUN rm package-lock.json

COPY . .

RUN npm run dockerbuild

RUN bash +x set-variables.sh

FROM bitnami/nginx:latest

COPY --from=base /app/build /app/build

COPY ./nginx/my_server_block.conf /opt/bitnami/nginx/conf/server_blocks/my_server_block.conf
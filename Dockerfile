FROM node:latest AS base

WORKDIR /app

COPY ./package.json .

RUN npm i --legacy-peer-deps

RUN rm package-lock.json

COPY . .

RUN npm run dockerbuild

RUN bash +x set-variables.sh

FROM nginx:latest

EXPOSE 4000

COPY --from=base /app/build /app/build

COPY ./nginx/my_server_block.conf /etc/nginx/conf.d/default.conf
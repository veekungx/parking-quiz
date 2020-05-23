FROM node:12-alpine as install
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install

FROM install as test
COPY . /usr/src/app
RUN npm test

FROM test as build
RUN npm run build

FROM node:alpine
WORKDIR /usr/src/app
COPY package.json /usr/src/app
COPY --from=build /usr/src/app/dist/ /usr/src/app/dist/
RUN npm install --only=prod
EXPOSE 3000
CMD ["npm","run" , "start:prod"]
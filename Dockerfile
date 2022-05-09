# stage 1 build the app
FROM node:14-alpine as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

# unit tests
RUN apk add chromium
ENV CHROME_BIN=/usr/bin/chromium-browser
RUN npm run test

RUN npm run build
# stage 2 set up app on nginx
FROM nginx:stable-alpine
COPY --from=build app/dist/sky-bet-test /usr/share/nginx/html

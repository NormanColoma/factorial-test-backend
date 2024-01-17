FROM node:20-alpine
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install && npm run build \
    && rm -rf src/ && rm package-lock.json && rm -rf node_modules/ \
    && rm -rf public/
RUN npm i -g serve

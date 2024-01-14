FROM node:20-alpine
WORKDIR /usr/src/app

COPY src/package-lock.json src/package.json ./
RUN npm i
COPY src .

CMD ["node","index.js"]

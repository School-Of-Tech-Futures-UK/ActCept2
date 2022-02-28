FROM node:latest

WORKDIR /app/

COPY package.json package-lock.json /app/

RUN cd /app && npm install

COPY server.js /app/

EXPOSE 3000

CMD cd /app && node server.js

FROM node:latest

COPY package.json package-lock.json /app/

COPY /src/api/api.js /app/

RUN cd /app && npm install

RUN cd /app && npm install cors pg-promise

EXPOSE 3000

CMD cd /app && node api.js
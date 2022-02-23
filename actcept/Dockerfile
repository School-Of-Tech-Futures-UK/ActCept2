FROM node:latest

# COPY package.json package-lock.json /app/

# COPY public /app/

# COPY src /app/

WORKDIR /app/

COPY package.json package-lock.json /app/

RUN cd /app && npm install

RUN cd /app && npm install cors pg-promise

COPY . /app

# RUN cd /app && npm install react-script:latest

RUN npm run build

# RUN node /app/src/api/api.js

EXPOSE 3000

# CMD cd /app && node api.js
CMD ["npm", "start"]
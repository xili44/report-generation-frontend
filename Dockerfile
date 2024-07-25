FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
USER root
RUN chmod 777 *
EXPOSE 3000

CMD npm run dev
FROM node:12-alpine3.11

WORKDIR /var/manage

COPY package.json ./
COPY package-lock.json ./
COPY app.js ./

COPY config/ config/
COPY models/ models/
COPY routes/ routes/

RUN npm ci --production

CMD ["node", "app.js"]

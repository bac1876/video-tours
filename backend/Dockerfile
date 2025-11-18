FROM node:18-alpine

RUN apk add --no-cache ffmpeg

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

RUN mkdir -p /app/uploads

EXPOSE 3001

ENV NODE_ENV=production

CMD ["npm", "start"]

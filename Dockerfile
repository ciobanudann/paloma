FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npx", "serve", "-s", "dist", "-l", "3001"]
#Buildando
FROM node:18-alpine AS builder

WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#Prod
FROM node:18-alpine
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY --from=builder /src/dist ./dist
EXPOSE 3000

CMD ["node", "dist/main"]

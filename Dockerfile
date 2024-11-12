# build deps
FROM node:20.18-slim AS build-deps
RUN npm install -g vite@4.4.11
WORKDIR /usr/react-app

COPY package*.json ./
RUN npm install

# build
FROM node:20.18-slim AS build
COPY --from=build-deps /usr/react-app /usr/react-app
WORKDIR /usr/react-app

COPY index.html public ./public markup ./markup ./
COPY tsconfig*.json vite.config.ts ./
COPY src ./src
RUN npm run build

# deploy
FROM node:20.18-slim AS deploy
COPY --from=build /usr/react-app /usr/react-app
WORKDIR /usr/react-app

EXPOSE 8000
CMD ["npm", "run", "start"]

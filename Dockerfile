## this is the stage one , also know as the build step

FROM node:12.17.0-alpine
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

## this is stage two , where the app actually runs

FROM node:12.17.0-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install -g ts-node
RUN npm install --only=production
COPY --from=0 /app/dist ./dist
EXPOSE 3000
CMD npm start
FROM node:12-alpine AS alpine

# Create app directory
WORKDIR /app

COPY package*.json ./
RUN npm install 
COPY . .

RUN npm run build

EXPOSE 4000
CMD [ "npm", "run", "start" ]

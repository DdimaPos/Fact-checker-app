#baseimage:version
FROM node:22 

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .  

EXPOSE
CMD ["npm", "run", "dev", "--", "--"]

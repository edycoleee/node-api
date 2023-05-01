#Dockerfile
FROM node
WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./
EXPOSE 3500
#Production============
#CMD ["node", "index.js"]
#Development===========
CMD ["npm", "run","dev"]



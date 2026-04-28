#skeleton structure of DockerFile
FROM node:22.14.0
#to create a folder named "app" in Docker desktop, also can use WORKDIR app
WORKDIR /usr/src/app 

#copy package form current directory to the docker directory
COPY package*.json ./

RUN npm install

#copy all the files from current folder to docker folder-app
COPY . .

#port:3000
EXPOSE 3000

CMD ["node", "server.js"]

# # Stage 1: Build
# FROM node:22.14.0 AS build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .

# # Stage 2: Production image
# FROM node:22.14.0-alpine
# WORKDIR /app
# COPY --from=build /app .
# EXPOSE 3000
# CMD ["node", "server.js"]
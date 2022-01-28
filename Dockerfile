FROM node:16.13.2

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install -g 

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
# Bundling of the server and installation of node modules
FROM node:alpine as server-builder
ARG NODE_ENV=production
COPY ./package*.json /app/
RUN cd /app && npm install --quiet;
WORKDIR /app
COPY . /app/
EXPOSE 80
CMD ["npm", "run-script", "start"]
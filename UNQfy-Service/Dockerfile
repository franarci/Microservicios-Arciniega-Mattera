FROM node

#ENV NODE_ENV=development
#ENV DEBUG=true

WORKDIR /home/node/unqfy

COPY package.json .
COPY package-lock.json .

RUN ["npm", "install"]

EXPOSE 5001

COPY . /home/node/unqfy/

#VOLUME ["/home/node/unqfy/app_data"]
# node:users 
RUN chown -R 777 /home/node/unqfy

#USER node

CMD [ "node", "src/API/requests/router.js" ]

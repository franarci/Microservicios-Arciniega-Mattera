FROM node

WORKDIR /home/node/unqfy

COPY package.json .
COPY package-lock.json .

RUN ["npm", "install"]

EXPOSE 5001

COPY . /home/node/unqfy/

RUN chown -R 777 /home/node/unqfy

CMD [ "node", "./src/API/requests/router.js" ]

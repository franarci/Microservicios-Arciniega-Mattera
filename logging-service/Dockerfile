FROM node

WORKDIR /home/node/logging

COPY package.json .
COPY package-lock.json .

RUN ["npm", "install"]

EXPOSE 5003

COPY . /home/node/logging/

RUN chown -R 777 /home/node/logging

CMD [ "node", "./src/API/loggingApi.js" ]

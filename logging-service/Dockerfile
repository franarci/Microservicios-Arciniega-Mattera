FROM node

#ENV NODE_ENV=development
#ENV DEBUG=true

WORKDIR /home/node/logging

COPY package.json .
COPY package-lock.json .

RUN ["npm", "install"]

EXPOSE 5003

COPY . /home/node/logging/

#VOLUME ["/home/node/unqfy/app_data"]
# node:users 
RUN chown -R 777 /home/node/logging

#USER node

CMD [ "npm", "run", "logging" ]

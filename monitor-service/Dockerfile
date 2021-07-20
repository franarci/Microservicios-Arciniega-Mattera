FROM node

#ENV NODE_ENV=development
#ENV DEBUG=true

WORKDIR /home/node/monitor

COPY package.json .
COPY package-lock.json .

RUN ["npm", "install"]

EXPOSE 5002

COPY . /home/node/monitor/

#VOLUME ["/home/node/monitor/app_data"]
# node:users 
RUN chown -R 777 /home/node/monitor

#USER node

CMD [ "npm", "run", "monitor" ]

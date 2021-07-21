FROM node

WORKDIR /home/node/monitor

COPY package.json .
COPY package-lock.json .

RUN ["npm", "install"]

EXPOSE 5002

COPY . /home/node/monitor/

RUN chown -R 777 /home/node/monitor

CMD [ "node", "./src/API/apiMonitor.js" ]

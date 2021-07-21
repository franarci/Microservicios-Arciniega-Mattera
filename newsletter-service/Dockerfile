FROM node

WORKDIR /home/node/newsletter

COPY package.json .
COPY package-lock.json .

RUN ["npm", "install"]

EXPOSE 5004

COPY . /home/node/newsletter/

RUN chown -R 777 /home/node/newsletter

CMD [ "node", "./src/API/newsletterApi.js" ]

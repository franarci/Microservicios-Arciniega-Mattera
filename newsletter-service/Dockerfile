FROM node

#ENV NODE_ENV=development
#ENV DEBUG=true

WORKDIR /home/node/newsletter

COPY package.json .
COPY package-lock.json .

RUN ["npm", "install"]

EXPOSE 5004

COPY . /home/node/newsletter/

#VOLUME ["/home/node/newsletter/app_data"]
# node:users 
RUN chown -R 777 /home/node/newsletter

#USER node

CMD [ "npm", "run", "newsletter" ]

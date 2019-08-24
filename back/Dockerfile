FROM node:10-alpine

RUN apk --no-cache add postgresql-dev
#RUN apk --no-cache add make python gcc postgresql-dev g++

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

#CMD [ "npm", "run", "start" ]
CMD ["sh", "-c", "tail -f /dev/null"]

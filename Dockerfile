FROM node

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password

RUN mkdir -p /home/app
# //copy everything from the current directory in the /home/app location of docker container
COPY . /home/app

CMD ["node","/home/app/server.js"]
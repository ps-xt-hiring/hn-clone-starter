FROM node:12.13.0-alpine

# make directory 
RUN mkdir -p /usr/src/app

#change to work directory
WORKDIR /usr/src/app

#copy dependencies
COPY . /usr/src/app

#install depenencies
RUN npm install

#expose port to run upon
EXPOSE 3000

#run start command
CMD ["npm", "start"]
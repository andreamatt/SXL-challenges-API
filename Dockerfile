FROM node:14

RUN mkdir -p /home/app

COPY . /home/app

CMD ["node", "/home/app/build/index.js"]

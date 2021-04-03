FROM node:14

RUN mkdir -p /home/app

COPY ./package.json /home/app/package.json
COPY ./yarn.lock /home/app/yarn.lock
RUN cd /home/app && yarn install

COPY tsconfig.json /home/app/tsconfig.json
COPY src /home/app/src
RUN cd /home/app && yarn build

ARG DB_URL

ENV DB_URL=$DB_URL

CMD ["node", "/home/app/build/index.js"]

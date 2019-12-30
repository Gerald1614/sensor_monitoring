FROM node:12
WORKDIR /usr/app/sensor_monit
RUN wget abyz.me.uk/rpi/pigpio/pigpio.tar -nc && tar xf pigpio.tar && cd PIGPIO && make && make install
COPY package.json .
COPY . .
EXPOSE 3000
# RUN yarn install && yarn build
RUN yarn install

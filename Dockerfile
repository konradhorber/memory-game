FROM node:22

WORKDIR /root/memory-game

COPY . .
CMD ["npm", "run"]
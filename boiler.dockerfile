FROM node:14.19.0-slim

ARG CONTAINER_PORT=3400
ARG NODE_ENV=development

RUN mkdir -p /home/node/app/node_modules /home/node/app/uploads && chown -R node:node /home/node/app

WORKDIR /home/node/app

USER node

COPY --chown=node:node package.json ./

RUN npm install

COPY --chown=node:node . .

ENV NODE_ENV=${NODE_ENV}

EXPOSE ${CONTAINER_PORT}

CMD ["npm", "run", "start"]


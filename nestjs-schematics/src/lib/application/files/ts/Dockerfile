FROM node:18 AS system

ARG UID=1000
ARG GID=1000

ENV HOST="0.0.0.0"
ENV PORT=3000

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

RUN userdel -rf node && \
    groupadd -g $GID -o node && \
    useradd -m -u $UID -g node -o node

RUN chown node:node -R /app

EXPOSE 3000
USER node:node


FROM system AS development

ENV NODE_ENV="development"

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn --frozen-lockfile

COPY . .
RUN yarn build

CMD ["yarn", "start:dev"]


FROM system as production

ENV NODE_ENV="production"

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn --production --frozen-lockfile

COPY --from=development /app/dist /app/dist

CMD ["yarn", "start:prod"]

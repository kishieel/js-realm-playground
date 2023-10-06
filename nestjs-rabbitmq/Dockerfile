FROM node:18 AS development

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

ARG UID=1000
ARG GID=1000

RUN userdel -r node && \
    groupadd -g $GID -o node && \
    useradd -m -u $UID -g node -o node

RUN chown node:node -R /app
USER node:node

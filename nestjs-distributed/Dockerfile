FROM node:18 AS system

ARG UID=1000
ARG GID=1000
ARG GITHUB_TOKEN

ENV HOST="0.0.0.0"
ENV PORT=3000

RUN apt-get update -y && apt-get install -y openssl

RUN userdel -rf node && \
    groupadd -g $GID -o node && \
    useradd -m -u $UID -g node -o node

WORKDIR /app
RUN chown node:node -R /app

EXPOSE 3000
USER node:node

RUN npm config set "//npm.pkg.github.com/:_authToken" "${GITHUB_TOKEN}" && \
    npm config set "@kishieel:registry" "https://npm.pkg.github.com/"


FROM system AS development

ENV NODE_ENV="development"

COPY --chown=node:node package.json package.json
COPY --chown=node:node yarn.lock yarn.lock
RUN yarn --frozen-lockfile

COPY --chown=node:node . .
RUN yarn build

CMD ["yarn", "start:dev"]


FROM system as production

ENV NODE_ENV="production"

COPY --chown=node:node package.json package.json
COPY --chown=node:node yarn.lock yarn.lock
RUN yarn --production --frozen-lockfile

COPY --from=development --chown=node:node /app/dist /app/dist

CMD ["yarn", "start:prod"]

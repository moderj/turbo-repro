ARG NODE_VERSION=22
ARG APP_NAME

FROM node:${NODE_VERSION}-alpine AS base
ARG APP_NAME
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@10.15.0 --activate
WORKDIR /app

FROM base AS setup
ARG APP_NAME
RUN pnpm add -g turbo@2.5.6
COPY . .
RUN turbo prune ${APP_NAME} --docker
RUN sed -i '/^settings:/a \  injectWorkspacePackages: false' ./out/pnpm-lock.yaml \
    && sed -i '/^settings:/a \  injectWorkspacePackages: false' ./out/json/pnpm-lock.yaml

FROM base AS fetcher
COPY --from=setup /app/out/json/pnpm*.yaml .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm fetch --ignore-scripts

FROM fetcher AS builder
ARG APP_NAME
COPY --from=setup /app/out/json/ .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prefer-offline --silent
COPY --from=setup /app/out/full/ .
RUN --mount=type=secret,id=TURBO_API,env=TURBO_API \
    --mount=type=secret,id=TURBO_TOKEN,env=TURBO_TOKEN \
    --mount=type=secret,id=TURBO_TEAM,env=TURBO_TEAM \
    pnpm build

FROM builder AS deployer
WORKDIR /app
RUN pnpm --filter=${APP_NAME} --prod --legacy --ignore-scripts deploy ./pruned

FROM base AS production
ENV NODE_ENV=production
WORKDIR /app
USER node
COPY --from=deployer /app/pruned/package.json package.json
COPY --from=deployer /app/pruned/node_modules node_modules
COPY --from=deployer /app/pruned/dist dist
ENV NODE_OPTIONS='-r elastic-apm-node/start.js --experimental-loader=elastic-apm-node/loader.mjs'
CMD ["node", "dist/index.js"]
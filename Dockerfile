FROM node:22.12.0 AS build
ENV NODE_ENV=production

WORKDIR /app

#COPY .yarn ./.yarn
COPY package.json . 
#COPY .yarnrc.yml .
#COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build -d

FROM node:22.12.0 AS runner
ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/.env.* ./. 
COPY --from=build /app/.next ./.next
COPY --from=build /app/next.config.ts ./next.config.ts
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

EXPOSE 3000

CMD ["yarn", "start"]


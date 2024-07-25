FROM node:20.11-slim

COPY . /app
WORKDIR /app

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

EXPOSE 9876

CMD ["pnpm", "start"]

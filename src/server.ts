import Hapi from "@hapi/hapi";

import status from "./plugins/status";
import prismaPlugin from "./plugins/prisma";
import usersPlugin from "./plugins/users";
import vacanciesPlugin from "./plugins/vacancies";

const server: Hapi.Server = Hapi.server({
  port: process.env.PORT || 8080,

  host: process.env.HOST || "localhost",
  routes: {
    cors: true,
  },
});

export async function createServer(): Promise<Hapi.Server> {
  await server.register([status, prismaPlugin, usersPlugin, vacanciesPlugin]);

  await server.initialize();

  return server;
}

export async function startServer(): Promise<Hapi.Server> {
  await server.start();

  return server;
}

process.on("unhandledRejection", (err) => {
  console.log(err);

  process.exit(1);
});

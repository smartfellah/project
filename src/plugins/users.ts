import Hapi from "@hapi/hapi";
// plugin to instantiate Prisma Client

const usersPlugin = {
  name: "app/users",

  dependencies: ["prisma"],

  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "POST",

        path: "/users",

        handler: registerHandler,
      },
    ]);
  },
};

export default usersPlugin;

interface UserInput {
  email: string;
  username: string;
  password: string;
  roleId: number;
}

async function registerHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  try {
    const { prisma } = request.server.app;

    const payload = request.payload as UserInput;

    const createdUser = await prisma.user.upsert({
      where: { email: payload.email },

      update: {},

      create: {
        email: payload.email,

        username: payload.username,

        password: payload.password,

        roleId: payload.roleId,
      },
    });
    return h.response(createdUser).code(201);
  } catch (err) {
    console.log(err);
  }
}

import Hapi from "@hapi/hapi";
// plugin to instantiate Prisma Client

const usersPlugin = {
  name: "app/users",

  dependencies: ["prisma"],

  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "POST",

        path: "/user",

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

    const responseObject = {
      ...createdUser,
      id: createdUser.id.toString(),
      roleId: createdUser.roleId.toString(),
    };

    return h.response(responseObject).code(201);
  } catch (err) {
    console.log(err);
  }
}

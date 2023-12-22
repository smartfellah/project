import Hapi from "@hapi/hapi";
import Joi from "@hapi/joi";
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
        options: {
          validate: {
            payload: userInputValidator,
          },
        },
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

const userInputValidator = Joi.object({
  email: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  roleId: Joi.number().required(),
});

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

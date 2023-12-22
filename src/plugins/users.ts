import Hapi from "@hapi/hapi";
import Joi from "@hapi/joi";
import { Boom, badImplementation } from "@hapi/boom";
import { jsonString } from "../utils/jsonString";
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
      {
        method: "GET",

        path: "/users/{userId}",

        handler: getUserHandler,

        options: {
          validate: {
            params: Joi.object({
              userId: Joi.number().integer(),
            }),
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

async function getUserHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app;

  const userId = BigInt(request.params.userId);
  console.log(userId);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return h.response().code(404);
    } else {
      return h.response(jsonString(user)).code(200);
    }
  } catch (err) {
    console.log(err);

    return badImplementation();
  }
}

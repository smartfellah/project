import Hapi from "@hapi/hapi";
import Joi from "@hapi/joi";
import { string } from "@hapi/joi";

interface UserInput {
  username: string;
  email: string;
  password: string;
  role: string;
}

const userInputValidation = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().optional(),
});

async function createUserHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) {
  const { prisma } = request.server.app;

  const payload = request.payload as UserInput;

  try {
    const createdUser = await prisma.user.create({
      data: {
        username: payload.username,

        email: payload.email,

        password: payload.password,

        role: null,
      },

      select: {
        id: true,
      },
    });

    return h.response(createdUser).code(201);
  } catch (err) {
    console.log(err);
  }
}

// plugin to instantiate Prisma Client

const usersPlugin = {
  name: "app/users",

  // needed to make sure that Hapi loads the Prisma plugin first
  dependencies: ["prisma"],

  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "POST",

        path: "/users",

        handler: createUserHandler,

        options: {
          validate: {
            payload: userInputValidation,
          },
        },
      },
    ]);
  },
};

export default usersPlugin;

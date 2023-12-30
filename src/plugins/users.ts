import Hapi from "@hapi/hapi";
import Joi from "@hapi/joi";
import { Boom, badImplementation } from "@hapi/boom";
import { jsonString } from "../utils/jsonString";
// plugin to instantiate Prisma Client

const userInputValidator = Joi.object({
  email: Joi.string().alter({
    create: (schema) => schema.required(),
    update: (schema) => schema.optional(),
  }),
  username: Joi.string().alter({
    create: (schema) => schema.required(),
    update: (schema) => schema.optional(),
  }),
  password: Joi.string().alter({
    create: (schema) => schema.required(),
    update: (schema) => schema.optional(),
  }),
  roleId: Joi.number().alter({
    create: (schema) => schema.required(),
    update: (schema) => schema.optional(),
  }),
});

const createUserValidator = userInputValidator.tailor("create");

const updateUserValidator = userInputValidator.tailor("update");

const usersPlugin = {
  name: "app/users",

  dependencies: ["prisma"],

  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "GET",

        path: "/users/{userId}",

        handler: getUserHandler,

        // options: {
        //   validate: {
        //     params: Joi.object({
        //       userId: Joi.number().integer(),
        //     }),
        //   },
        // },
      },
      {
        method: "GET",

        path: "/users",

        handler: getUsersHandler,

        // options: {
        //   validate: {
        //     params: Joi.object({
        //       userId: Joi.number().integer(),
        //     }),
        //   },
        // },
      },
      {
        method: "POST",

        path: "/users",

        handler: registerHandler,
        // options: {
        //   validate: {
        //     payload: createUserValidator,
        //   },
        // },
      },
      {
        method: "DELETE",

        path: "/users/{userId}",

        handler: deleteUserHandler,

        // options: {
        //   validate: {
        //     params: Joi.object({
        //       userId: Joi.number().integer(),
        //     }),
        //   },
        // },
      },

      {
        method: "PUT",

        path: "/users/{userId}",

        handler: updateUserHandler,

        // options: {
        //   validate: {
        //     params: Joi.object({
        //       userId: Joi.number().integer(),
        //     }),

        //     payload: updateUserValidator,
        //   },
        // },
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

    let payload = request.payload as any;
    payload = JSON.parse(payload);

    console.log(payload);

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

async function getUsersHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app;

  try {
    const users = await prisma.user.findMany({});

    if (!users) {
      return h.response().code(404);
    } else {
      return h.response(jsonString(users)).code(200);
    }
  } catch (err) {
    console.log(err);

    return badImplementation();
  }
}

async function deleteUserHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) {
  const { prisma } = request.server.app;

  const userId = BigInt(request.params.userId);

  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return h.response().code(204);
  } catch (err) {
    console.log(err);

    return h.response().code(500);
  }
}

async function updateUserHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) {
  const { prisma } = request.server.app;

  const userId = BigInt(request.params.userId);

  const payload = request.payload as Partial<UserInput>;

  try {
    console.log(userId);
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },

      data: payload,
    });

    return h.response(jsonString(updatedUser)).code(200);
  } catch (err) {
    console.log(err);
    return h.response().code(500);
  }
}

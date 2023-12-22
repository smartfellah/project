import Hapi from "@hapi/hapi";
import Joi from "@hapi/joi";
import { Boom, badImplementation } from "@hapi/boom";
import { jsonString } from "../utils/jsonString";

const vacanciesPlugin = {
  name: "app/vacancies",

  dependencies: ["prisma"],

  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "GET",

        path: "/vacancies/{vacancyId}",

        handler: getVacancyHandler,

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

        path: "/vacancies",

        handler: getVacanciesHandler,

        // options: {
        //   validate: {
        //     params: Joi.object({
        //       userId: Joi.number().integer(),
        //     }),
        //   },
        // },
      },
    ]);
  },
};

export default vacanciesPlugin;

interface VacancyInput {
  email: string;
  username: string;
  password: string;
  roleId: number;
}

// async function registerHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
//   try {
//     const { prisma } = request.server.app;

//     const payload = request.payload as VacancyInput;

//     const createdUser = await prisma.user.upsert({
//       where: { email: payload.email },

//       update: {},

//       create: {
//         email: payload.email,

//         username: payload.username,

//         password: payload.password,

//         roleId: payload.roleId,
//       },
//     });

//     const responseObject = {
//       ...createdUser,
//       id: createdUser.id.toString(),
//       roleId: createdUser.roleId.toString(),
//     };

//     return h.response(responseObject).code(201);
//   } catch (err) {
//     console.log(err);
//   }
// }

async function getVacancyHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) {
  const { prisma } = request.server.app;

  const vacancyId = BigInt(request.params.userId);
  console.log(vacancyId);

  try {
    const vacancy = await prisma.user.findUnique({
      where: {
        id: vacancyId,
      },
    });

    if (!vacancy) {
      return h.response().code(404);
    } else {
      return h.response(jsonString(vacancy)).code(200);
    }
  } catch (err) {
    console.log(err);

    return badImplementation();
  }
}

async function getVacanciesHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) {
  const { prisma } = request.server.app;

  try {
    const vacancies = await prisma.vacancy.findMany({});

    if (!vacancies) {
      return h.response().code(404);
    } else {
      return h.response(jsonString(vacancies)).code(200);
    }
  } catch (err) {
    console.log(err);

    return badImplementation();
  }
}

// async function deleteUserHandler(
//   request: Hapi.Request,
//   h: Hapi.ResponseToolkit
// ) {
//   const { prisma } = request.server.app;

//   const userId = BigInt(request.params.userId);

//   try {
//     await prisma.user.delete({
//       where: {
//         id: userId,
//       },
//     });

//     return h.response().code(204);
//   } catch (err) {
//     console.log(err);

//     return h.response().code(500);
//   }
// }

// async function updateUserHandler(
//   request: Hapi.Request,
//   h: Hapi.ResponseToolkit
// ) {
//   const { prisma } = request.server.app;

//   const userId = BigInt(request.params.userId);

//   const payload = request.payload as Partial<UserInput>;

//   try {
//     console.log(userId);
//     const updatedUser = await prisma.user.update({
//       where: {
//         id: userId,
//       },

//       data: payload,
//     });

//     return h.response(jsonString(updatedUser)).code(200);
//   } catch (err) {
//     console.log(err);
//     return h.response().code(500);
//   }
// }

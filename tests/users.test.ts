import { createServer } from "../src/server";

import Hapi from "@hapi/hapi";

describe("POST /users - create user", () => {
  let server: Hapi.Server;

  beforeAll(async () => {
    server = await createServer();
  });

  afterAll(async () => {
    await server.stop();
  });

  let userId;

  test("create user", async () => {
    const response = await server.inject({
      method: "POST",

      url: "/user",

      payload: {
        email: `test-${Date.now()}@prisma.io`,
        username: "testusername",
        password: "testpassword",
        roleId: 1, // Assuming `1` is a valid role ID
      },
    });
    // console.log(response);

    expect(response.statusCode).toEqual(201);

    userId = JSON.parse(response.payload)?.id;

    // expect(typeof userId === "number").toBeTruthy();
  });
});

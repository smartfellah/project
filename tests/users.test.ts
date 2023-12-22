import { createServer } from "../src/server";

import Hapi from "@hapi/hapi";

describe("users endpoints", () => {
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

      url: "/users",

      payload: {
        email: `test-${Date.now()}@prisma.io`,
        username: "testusername",
        password: "testpassword",
        roleId: 1,
      },
    });
    // console.log(response);

    expect(response.statusCode).toEqual(201);

    userId = JSON.parse(response.payload)?.id;
    // console.log(userId);
  });

  test("create user validation", async () => {
    const response = await server.inject({
      method: "POST",

      url: "/users",

      payload: {
        email: `test-${Date.now()}@prisma.io`,
      },
    });

    console.log(response.payload);

    expect(response.statusCode).toEqual(400);
  });

  test("get user returns 404 for non existant user", async () => {
    const response = await server.inject({
      method: "GET",

      url: "/users/9999",
    });

    expect(response.statusCode).toEqual(404);
  });

  test("get user returns user", async () => {
    const response = await server.inject({
      method: "GET",

      url: `/users/${userId}`,
    });

    expect(response.statusCode).toEqual(200);

    const user = JSON.parse(response.payload);

    expect(user.id).toBe(userId);
  });

  test("update user fails with invalid userId parameter", async () => {
    const response = await server.inject({
      method: "PUT",

      url: `/users/aa22`,
    });

    expect(response.statusCode).toEqual(400);
  });

  test("update user", async () => {
    const updatedUsername = "username-UPDATED";

    const response = await server.inject({
      method: "PUT",

      url: `/users/${userId}`,

      payload: {
        username: updatedUsername,
      },
    });

    expect(response.statusCode).toEqual(200);

    const user = JSON.parse(response.payload);

    expect(user.username).toEqual(updatedUsername);
  });

  test("delete user fails with invalid userId parameter", async () => {
    const response = await server.inject({
      method: "DELETE",

      url: `/users/aa22`,
    });

    expect(response.statusCode).toEqual(400);
  });

  test("delete user", async () => {
    const response = await server.inject({
      method: "DELETE",

      url: `/users/${userId}`,
    });

    expect(response.statusCode).toEqual(204);
  });
});

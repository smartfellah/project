import { createServer } from "../src/server";

import Hapi from "@hapi/hapi";

describe("vacancies endpoints", () => {
  let server: Hapi.Server;

  beforeAll(async () => {
    server = await createServer();
  });

  afterAll(async () => {
    await server.stop();
  });

  let vacancyId = 1;

  test("get vacancy returns 404 for non existant vacancy", async () => {
    const response = await server.inject({
      method: "GET",

      url: "/users/9999",
    });

    expect(response.statusCode).toEqual(404);
  });

  test("get vacancy returns vacancy", async () => {
    const response = await server.inject({
      method: "GET",

      url: `/users/${vacancyId}`,
    });

    expect(response.statusCode).toEqual(200);

    const vacancy = JSON.parse(response.payload);

    expect(BigInt(vacancy.id)).toBe(vacancyId);
  });
});

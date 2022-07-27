import supertest from "supertest";

import app from "../../index";

const request = supertest(app);

describe("Authorization Test", () => {
  it("Signup user Omar Sabra", async () => {
    const user = {
      first_name: "Omar",
      last_name: "Sabra",
      username: "omarsabra",
      password: "password123",
    };
    const res = await request.post("/signup").send(user);
    expect(res.statusCode).toBe(201);
  });
  let token: string;

  it("Check username omarsabra access token", async () => {
    const user = {
      username: "omarsabra",
      password: "password123",
    };
    const res = await request.post("/login").send(user);
    token = JSON.parse(res.text).access_token;
    expect(token);
  });
});

import supertest from "supertest";

import app from "../../index";

//Setting supertest object on the app instence
const request = supertest(app);

//Root route test
describe("Signup Routes/Models", () => {
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

  it("Get user omarsabra with id = 1", async () => {
    const res = await request.get("/users/1");
    expect(JSON.parse(res.text)).toEqual({
      first_name: "Omar",
      last_name: "Sabra",
      username: "omarsabra",
    });
  });

  it("Check username omarsabra access token", async () => {
    const user = {
      username: "omarsabra",
      password: "password123",
    };
    const res = await request.post("/login").send(user);
    expect(JSON.parse(res.text).access_token);
  });
});

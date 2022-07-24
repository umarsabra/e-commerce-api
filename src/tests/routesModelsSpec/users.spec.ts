import supertest from "supertest";

import app from "../../index";

const request = supertest(app);

describe("User Routes/Models", () => {
  let token: string;

  it("Create user Test User with Omar's token", async () => {
    const yasser = {
      first_name: "Test",
      last_name: "User",
      username: "testuser",
      password: "password123",
    };
    const omar = {
      username: "omarsabra",
      password: "password123",
    };
    const login_omar_res = await request.post("/login").send(omar);
    token = `Bearer ${JSON.parse(login_omar_res.text).access_token}`;

    const create_yasser_res = await request
      .post("/users")
      .set("authorization", token)
      .send(yasser);

    expect(JSON.parse(create_yasser_res.text)).toEqual({
      first_name: "Test",
      last_name: "User",
      username: "testuser",
      id: 2,
    });
  });
  it("Get user omarsabra with id = 1", async () => {
    const res = await request.get("/users/1").set("authorization", token);
    expect(JSON.parse(res.text)).toEqual({
      first_name: "Omar",
      last_name: "Sabra",
      username: "omarsabra",
    });
  });

  it("Get all users", async () => {
    const res = await request.get("/users").set("authorization", token);

    expect(JSON.parse(res.text)).toEqual([
      {
        first_name: "Omar",
        last_name: "Sabra",
        username: "omarsabra",
        id: 1,
      },
      {
        first_name: "Test",
        last_name: "User",
        username: "testuser",
        id: 2,
      },
    ]);
  });
});

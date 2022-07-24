import supertest from "supertest";

import app from "../../index";

//Setting supertest object on the app instence
const request = supertest(app);

//Root route test
describe("User Routes/Models", () => {
  it("Get user omarsabra with id = 1", async () => {
    const res = await request.get("/users/1");
    expect(JSON.parse(res.text)).toEqual({
      first_name: "Omar",
      last_name: "Sabra",
      username: "omarsabra",
    });
  });
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
    });
  });

  it("Get all users", async () => {
    const res = await request.get("/users");

    expect(JSON.parse(res.text)).toEqual([
      {
        first_name: "Omar",
        last_name: "Sabra",
        username: "omarsabra",
      },
      {
        first_name: "Test",
        last_name: "User",
        username: "testuser",
      },
    ]);
  });
  it("Delete test user ID = 2", async () => {
    const res = await request.delete("/users/2").set("authorization", token);

    expect(res.status).toBe(200);
  });
});

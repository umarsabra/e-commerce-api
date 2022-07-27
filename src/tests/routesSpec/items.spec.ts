import supertest from "supertest";

import app from "../../index";

const request = supertest(app);

describe("Items Route Tests", () => {
  let token: string;
  it("Adding one item", async () => {
    const item = {
      title: "Milk 250ml",
      price: "5",
    };
    const user = {
      username: "omarsabra",
      password: "password123",
    };

    //Login to get token
    const res = await request.post("/login").send(user);
    token = `Bearer ${JSON.parse(res.text).access_token}`;

    const add_item_res = await request
      .post("/items")
      .set("authorization", token)
      .send(item);

    expect(JSON.parse(add_item_res.text)).toEqual({
      title: "Milk 250ml",
      price: "5",
      id: 2,
    });
  });

  it("Get one item with ID = 2", async () => {
    const get_item_res = await request.get("/items/2");

    expect(JSON.parse(get_item_res.text)).toEqual({
      title: "Milk 250ml",
      price: "5",
      id: 2,
    });
  });

  it("Get all items", async () => {
    const get_items_res = await request.get("/items");

    expect(JSON.parse(get_items_res.text)).toEqual([
      {
        title: "Milk 250ml",
        price: "5",
        id: 1,
      },
      {
        title: "Milk 250ml",
        price: "5",
        id: 2,
      },
    ]);
  });
});

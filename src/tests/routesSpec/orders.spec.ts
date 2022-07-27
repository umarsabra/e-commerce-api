import supertest from "supertest";

import app from "../../index";

const request = supertest(app);

describe("Orders Route Tests", () => {
  let token: string;
  it("Creating a pending order", async () => {
    const user = {
      username: "omarsabra",
      password: "password123",
    };

    //Login to get token
    const res = await request.post("/login").send(user);
    token = `Bearer ${JSON.parse(res.text).access_token}`;

    const create_order_res = await request
      .post("/orders")
      .set("authorization", token);

    expect(JSON.parse(create_order_res.text)).toEqual({
      id: 2,
      status: "pending",
      user_id: 2,
    });
  });

  it("Add item to order of ID = 1", async () => {
    const item = {
      quantity: 5,
      item_id: 2,
    };
    const add_item_res = await request
      .post("/orders/1/items")
      .set("authorization", token)
      .send(item);

    expect(JSON.parse(add_item_res.text)).toEqual({
      id: 2,
      quantity: 5,
      item_id: 2,
      order_id: 1,
    });
  });

  it("Get order of ID = 1", async () => {
    const get_one_order = await request
      .get("/orders/1")
      .set("authorization", token);

    expect(JSON.parse(get_one_order.text)).toEqual([
      {
        id: 1,
        quantity: 5,
        item_id: 1,
        order_id: 1,
      },
      { id: 2, quantity: 5, item_id: 2, order_id: 1 },
    ]);
  });
});

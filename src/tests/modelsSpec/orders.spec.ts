import { OrderStore } from "../../models/order_model";

const order = new OrderStore();

describe("Orders Models Tests", () => {
  it("Test create method", async () => {
    const create_order = await order.create(null);

    expect(create_order).toEqual({
      id: 1,
      user_id: null,
      status: "pending",
    });
  });

  it("Test add item method", async () => {
    const add_item_test = {
      quantity: 5,
      item_id: "1",
      order_id: "1",
    };
    const add_item = await order.addItem(
      add_item_test.quantity,
      add_item_test.item_id,
      add_item_test.order_id
    );

    expect(add_item).toEqual({
      id: 1,
      quantity: 5,
      item_id: 1,
      order_id: 1,
    });
  });
  it("Test index method", async () => {
    const index_order = await order.index();

    expect(index_order).toEqual([
      {
        id: 1,
        user_id: null,
        status: "pending",
      },
    ]);
  });
});

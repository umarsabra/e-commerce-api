import { ItemStore } from "../../models/item_model";

const item = new ItemStore();

describe("Items Models Tests", () => {
  const test_item = {
    id: 1,
    title: "Milk 250ml",
    price: "5",
  };
  it("Test create method", async () => {
    const create_item = await item.create(test_item.title, test_item.price);

    expect(create_item).toEqual(test_item);
  });

  it("Test show method", async () => {
    const show_item = await item.show("1");

    expect(show_item).toEqual(test_item);
  });
  it("Test index method", async () => {
    const index_item = await item.index();

    expect(index_item).toEqual([test_item]);
  });
});

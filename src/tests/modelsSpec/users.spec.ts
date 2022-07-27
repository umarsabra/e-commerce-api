import { UserStore } from "../../models/user_model";

const user = new UserStore();

describe("Users Models Tests", () => {
  const test_user = {
    first_name: "User",
    last_name: "Model",
    username: "usermodel",
    password: "123",
  };
  it("Test create method", async () => {
    const create_user = await user.create(test_user);

    expect(create_user).toEqual({
      first_name: "User",
      last_name: "Model",
      username: "usermodel",
      id: 1,
    });
  });

  it("Test show method", async () => {
    const show_user = await user.show("1");

    expect(show_user).toEqual({
      first_name: "User",
      last_name: "Model",
      username: "usermodel",
    });
  });
  it("Test index method", async () => {
    const index_user = await user.index();

    expect(index_user).toEqual([
      {
        first_name: "User",
        last_name: "Model",
        username: "usermodel",
        id: 1,
      },
    ]);
  });
});

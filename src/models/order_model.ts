import Client from "../database";

export type Order = {
  id: number;
  user_id: string;
  status: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders\nError: ${err}`);
    }
  }

  async show(id: string): Promise<Order[]> {
    try {
      const sql = "SELECT * FROM orders_items WHERE order_id=($1)";

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find order ${id}\nError: ${err}`);
    }
  }

  async create(user_id: string): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *";

      const conn = await Client.connect();

      const result = await conn.query(sql, ["pending", user_id]);

      const new_item = result.rows[0];

      conn.release();

      return new_item;
    } catch (err) {
      throw new Error(`Could create order\nError: ${err}`);
    }
  }

  async addItem(
    quantity: number,
    item_id: string,
    order_id: string
  ): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders_items (quantity, item_id, order_id) VALUES ($1, $2, $3) RETURNING *";

      const conn = await Client.connect();

      const result = await conn.query(sql, [quantity, item_id, order_id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add items ${item_id}\nError: ${err}`);
    }
  }
}

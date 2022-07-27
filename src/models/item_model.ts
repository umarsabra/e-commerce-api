import Client from "../database";

export type Item = {
  id: number;
  title: string;
  price: string;
};

export class ItemStore {
  async index(): Promise<Item[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM items";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get items\nError: ${err}`);
    }
  }

  async show(id: string): Promise<Item> {
    try {
      const sql = "SELECT * FROM items WHERE id=($1)";

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find item with id: ${id}\nError: ${err}`);
    }
  }

  async create(title: string, price: string): Promise<Item> {
    try {
      const sql = "INSERT INTO items (title, price) VALUES($1, $2) RETURNING *";

      const conn = await Client.connect();

      const result = await conn.query(sql, [title, price]);

      const new_item = result.rows[0];

      conn.release();

      return new_item;
    } catch (err) {
      throw new Error(`Could not add new item ${title}\nError: ${err}`);
    }
  }

  async delete(id: string): Promise<Item> {
    try {
      const sql = "DELETE FROM items WHERE id=($1)";

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const deleted_item = result.rows[0];

      conn.release();

      return deleted_item;
    } catch (err) {
      throw new Error(`Could not delete item ${id}. Error: ${err}`);
    }
  }
}

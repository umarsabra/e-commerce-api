import Client from "../database";
import bcrypt from "bcrypt";

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  username: string;
  password?: string;
};

const PEPPER = process.env.BCRYPT_PEPPER;
const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS as string;

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT id, first_name, last_name, username FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get user\nError: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql =
        "SELECT first_name, last_name, username FROM users WHERE id=($1)";

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}\nError: ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO users (first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING id, first_name, last_name, username";

      const conn = await Client.connect();

      const hashed_passowrd = bcrypt.hashSync(
        (user.password as unknown as string) + PEPPER,
        parseInt(SALT_ROUNDS)
      );

      const result = await conn.query(sql, [
        user.first_name,
        user.last_name,
        user.username,
        hashed_passowrd,
      ]);

      const new_user = result.rows[0];

      conn.release();

      return new_user;
    } catch (err) {
      throw new Error(`Could not create user ${user.username}\nError: ${err}`);
    }
  }
  async signup(user: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO users (first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING id, first_name, last_name, username";

      const conn = await Client.connect();

      const hashed_passowrd = bcrypt.hashSync(
        (user.password as unknown as string) + PEPPER,
        parseInt(SALT_ROUNDS)
      );

      const result = await conn.query(sql, [
        user.first_name,
        user.last_name,
        user.username,
        hashed_passowrd,
      ]);

      const new_user = result.rows[0];

      conn.release();

      return new_user;
    } catch (err) {
      throw new Error(`Could not create user ${user.username}\nError: ${err}`);
    }
  }
  async authenticate(
    username: string,
    plain_password: string
  ): Promise<User | null> {
    const sql = "SELECT * FROM users WHERE username=($1)";

    const conn = await Client.connect();

    const result = await conn.query(sql, [username]);

    const user = result.rows[0];

    conn.release();

    //Check if the user exsits
    if (!user) {
      return null;

      //Check if the password correct
    } else if (bcrypt.compareSync(plain_password + PEPPER, user.password)) {
      return user;

      //Check is the password isn't correct
    } else {
      return null;
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = "DELETE FROM users WHERE id=($1)";

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const deleted_user = result.rows[0];

      conn.release();

      return deleted_user;
    } catch (err) {
      throw new Error(`Could not delete item ${id}. Error: ${err}`);
    }
  }
}

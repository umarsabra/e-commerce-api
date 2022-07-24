import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();
const {
  POSTGRES_HOST,
  POSTGRES_DATABASE,
  POSTGRES_TEST_DATABASE,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV,
} = process.env;

let client: Pool;

if (ENV === "dev") {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DATABASE,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
} else {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DATABASE,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default client;

# 🛒 e-Commerce API

## Installation

```bash
git clone https://github.com/umarsabra/e-commerce-api.git
cd e-commerce-api
npm i
```

## Getting started

- Change the default postgres user password to postgres and create prod_db database

##### Notice

- Database runs on the default port and localhost `http://localhost:5432`

```bash
sudo -u postgres psql
ALTER USER postgres PASSWORD 'postgres';
CREATE DATABASE prod_db;
```

- Running Migrations

```bash
npm run migrate
```

- Running Test

```bash
npm run test
```

- Staring

```bash
npm start
```

## Notice

`.env` file is set up from the `database.ts` file in [src/database.ts](https://github.com/umarsabra/e-commerce-api/blob/main/src/database.ts)

or you can run `source .env`

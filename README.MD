# 🛒 e-Commerce API

## Installation

```bash
    git https://github.com/umarsabra/e-commerce-api.git
    cd e-commerce-api
    npm i
    npm start
```

## API Endpoints

#### Sign Up

- `POST /signup` Create user [token not required]

```ts
{
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}
```

#### Login

- `POST /login` returnes access token

```ts
{
  username: string;
  password: string;
}
```

#### Items

- `GET /items` Get all items

- `GET /items/:id` Get item by ID

- `POST /items` Add item [token required]

```ts
{
  title: string;
  price: number;
}
```

- `DELETE /items/:id` Delete item by ID [token required]

#### Users

- `GET /users` Get all users [token required]

- `GET /users/:id` Get user by ID [token required]

- `POST /users` Add user [token required]

```ts
{
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}
```

- `DELETE /users/:id` Delete user by ID [token required]

#### Orders

- `GET /orders` Get all orders [token required]

- `GET /orders/:id` Get order's items by order ID [token required]

- `POST /orders` Create pending order [token required]

- `POST /orders/:id/items` Add item to an order [token required]

```ts
{
  item_id: number;
  quantity: number;
}
```

## Data Shapes

#### Item

- id
- title
- price

#### User

- id
- first_name
- last_name
- username
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (pending or complete)

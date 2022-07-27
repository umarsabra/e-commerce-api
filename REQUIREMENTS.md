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

- `POST /users` Add user

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

- id: number
- title: string
- price: number

#### User

- id: number
- first_name: string
- last_name: string
- username: string
- password: string

#### Orders

- id: number
- status: string
- user_id: number

#### Orders Items

- id: number
- qunatity: number
- item_id: number
- order_id: number

## Database Schemas

#### items
                                   Table "public.items"
 Column |         Type          | Collation | Nullable |              Default              
--------+-----------------------+-----------+----------+-----------------------------------
 id     | integer               |           | not null | nextval('items_id_seq'::regclass)
 title  | character varying(50) |           |          | 
 price  | numeric               |           |          | 
Indexes:
    "items_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "orders_items" CONSTRAINT "orders_items_item_id_fkey" FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE

#### users
                                     Table "public.users"
   Column   |         Type          | Collation | Nullable |              Default              
------------+-----------------------+-----------+----------+-----------------------------------
 id         | integer               |           | not null | nextval('users_id_seq'::regclass)
 first_name | character varying(50) |           |          | 
 last_name  | character varying(50) |           |          | 
 username   | character varying(50) |           |          | 
 password   | text                  |           |          | 
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

#### orders
                                    Table "public.orders"
 Column  |         Type          | Collation | Nullable |              Default               
---------+-----------------------+-----------+----------+------------------------------------
 id      | integer               |           | not null | nextval('orders_id_seq'::regclass)
 status  | character varying(50) |           |          | 
 user_id | integer               |           |          | 
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
Referenced by:
    TABLE "orders_items" CONSTRAINT "orders_items_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE

#### orders_items
                             Table "public.orders_items"
  Column  |  Type   | Collation | Nullable |                 Default                  
----------+---------+-----------+----------+------------------------------------------
 id       | integer |           | not null | nextval('orders_items_id_seq'::regclass)
 quantity | integer |           |          | 
 item_id  | integer |           |          | 
 order_id | integer |           |          | 
Indexes:
    "orders_items_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_items_item_id_fkey" FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
    "orders_items_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE

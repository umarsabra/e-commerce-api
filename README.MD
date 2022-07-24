# e-Commerce API

## API Endpoints

#### Items

- Index
- Show
- Create [token required]
- Delete [token required]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required]
- Show [token required]
- Create N[token required]
- Delete [token required]

#### Orders

- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

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

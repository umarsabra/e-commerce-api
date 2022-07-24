import express, { Application } from "express";
import login_router from "./auth/login";
import signup_router from "./auth/signup";
import items_router from "./routes/items";
import orders_router from "./routes/orders";
import users_router from "./routes/users";

const app: Application = express();

app.use(express.json());

app.use("/login", login_router);
app.use("/signup", signup_router);
app.use("/items", items_router);
app.use("/orders", orders_router);
app.use("/users", users_router);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server is running on:\nhttp://localhost:${PORT}`)
);

export default app;

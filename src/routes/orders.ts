import express from "express";
import { OrderStore } from "../models/order_model";
import { verify_token } from "../auth/jwt_helpers";
const router = express.Router();

const order = new OrderStore();

//GET ALL ORDERS
router.get("/", verify_token, async (req, res) => {
  const orders = await order.index();
  res.status(200);
  res.json(orders);
});

//GET ONE ORDER
router.get("/:id", verify_token, async (req, res) => {
  const id = req.params.id;
  const result = await order.show(id);
  res.status(200);
  res.json(result);
});

//CREATE ORDER
router.post("/", verify_token, async (req, res) => {
  const user_id = res.locals.user.user_id as string;

  const new_order = await order.create(user_id);
  res.status(201);
  res.json(new_order);
});

//ADD ITEM TO ORDER
router.post("/:id/items", verify_token, async (req, res) => {
  const quantity = req.body.quantity as number;
  const item_id = req.body.item_id as string;
  const order_id = req.params.id as string;

  if (!quantity || !item_id || !order_id) {
    res.status(400);
    res.json({ err: "Invalid Parameters" });
  } else {
    const new_order = await order.addItem(quantity, item_id, order_id);
    res.status(200);
    res.json(new_order);
  }
});

export default router;

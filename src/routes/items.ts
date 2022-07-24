import express from "express";
import { verify_token } from "../auth/jwt_helpers";
import { ItemStore } from "../models/item_model";

const router = express.Router();

const item = new ItemStore();

//GET ALL ITEMS
router.get("/", async (req, res) => {
  const items = await item.index();
  res.json(items);
});

//GET ONE ITEM
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await item.show(id);
  res.json(result);
});

//ADD ONE ITEM
router.post("/", verify_token, async (req, res) => {
  try {
    const title = req.body.title;
    const price = Number(req.body.price);
    const new_item = await item.create(title, price);
    res.status(201);
    res.json(new_item);
  } catch {
    res.status(400);
    res.json({ err: "Invalid Parameters" });
  }
});

//DELETE ITEM BY ID
router.delete("/:id", verify_token, async (req, res) => {
  const id = req.params.id as string;
  const result = await item.delete(id);
  res.json(result);
});

export default router;

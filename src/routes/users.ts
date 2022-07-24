import express from "express";
import { UserStore, User } from "../models/user_model";
import { verify_token } from "../auth/jwt_helpers";

const router = express.Router();

const user = new UserStore();

//GET ALL USERS
router.get("/", async (req, res) => {
  const users = await user.index();
  res.status(200);
  res.json(users);
});

//GET ONE USER
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await user.show(id);
  res.status(200);
  res.json(result);
});

//CREATE USER
router.post("/", verify_token, async (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const username = req.body.username;
  const password = req.body.password;

  if (!first_name || !last_name || !username || !password) {
    res.status(400);
    res.json({ err: "Invalid Parameters" });
  } else {
    const new_user: User = {
      first_name: first_name,
      last_name: last_name,
      username: username,
      password: password,
    };
    const new_item = await user.create(new_user);
    res.status(201);
    res.json(new_item);
  }
});

//DELETE ITEM BY ID
router.delete("/:id", verify_token, async (req, res) => {
  const id = req.params.id as string;
  const result = await user.delete(id);
  res.status(200);
  res.json(result);
});

export default router;

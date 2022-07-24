import express from "express";
import { UserStore, User } from "../models/user_model";

const router = express.Router();

const user = new UserStore();

router.post("/", async (req, res) => {
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

export default router;

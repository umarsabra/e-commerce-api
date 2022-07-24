import express from "express";
import { UserStore } from "../models/user_model";
import { sign_token } from "./jwt_helpers";

const router = express.Router();

const user = new UserStore();

//Login
router.post("/", async (req, res) => {
  const username: string = req.body.username;
  const password: string = req.body.password;
  if (!username || !password) {
    res.status(401);
    res.json({ err: "Invalid Credentials" });
    return;
  }

  const current_user = await user.authenticate(username, password);
  if (current_user) {
    res.status(200);
    const token = sign_token(current_user.id as number);
    res.json({ access_token: token });
  } else {
    res.status(401);
    res.json({ err: "Invalid Credentials" });
  }
});

export default router;

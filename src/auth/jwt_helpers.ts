import { Request, Response, NextFunction } from "express";
import { verify, JwtPayload, sign } from "jsonwebtoken";

const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY as string;

function verify_token(req: Request, res: Response, next: NextFunction) {
  const authorization_header = req.headers.authorization as string;

  if (!authorization_header) {
    res.status(401);
    res.json({ err: "Token Required" });
    return;
  }
  try {
    const token = authorization_header.split(" ")[1];
    const decoded = verify(token, TOKEN_SECRET_KEY) as JwtPayload;

    if (decoded.user.user_id) {
      //Make user id accessable to next functions
      res.locals.user = decoded.user;

      next();
    } else {
      res.status(401);
      res.json({ err: "Invalid Token" });
    }
  } catch {
    res.status(401);
    res.json({ err: "Invalid Token" });
  }
}

function sign_token(user_id: number) {
  return sign({ user: { user_id } }, TOKEN_SECRET_KEY); // Sign the token and add the userId to it
}

export { verify_token, sign_token };

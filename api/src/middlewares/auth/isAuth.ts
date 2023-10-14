import jwt from "jsonwebtoken";

import keys from "@/config/keys";
import { UserService } from "@/services/user";

interface JWTPayload {
  wallet: string;
}

export const isAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const jwtSecret = keys.jwtSecret;

  if (!authHeader)
    return res.status(401).send({ error: "No auth header provided" });

  if (typeof authHeader !== "string")
    return res.status(401).send({ error: "Invalid structure" });

  const [, token] = authHeader.split(" ");
  if (!token) return res.status(401).send({ error: "No auth header provided" });

  let decoded: JWTPayload;

  try {
    decoded = jwt.verify(token, jwtSecret) as JWTPayload;
  } catch (err) {
    return res.status(401).send({ error: "Invalid token" });
  }

  if (!decoded) return res.status(401).send({ error: "Invalid token" });

  const userService = new UserService();

  const user = await userService.findByWallet(decoded.wallet);

  req.user = user;

  return next();
};

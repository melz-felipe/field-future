import { Response } from "express";

import { logger } from "@/services/logger";
import { AuthService } from "@/services/auth";
import { LoginSchema, RequestLoginKeySchema } from "@/routes/schemas/auth";

export const login = async (req: LoginSchema, res: Response) => {
  try {
    const { wallet, signature } = req.body;

    const authService = new AuthService();

    const { token, user } = await authService.authenticate(wallet, signature);

    return res.status(200).send({ token, user });
  } catch (err) {
    logger.error(err);
    return res.status(500).send("Something went wrong.");
  }
};

export const requestKey = async (req: RequestLoginKeySchema, res: Response) => {
  try {
    const { wallet } = req.params;

    const authService = new AuthService();

    const { key } = await authService.requestLoginKey(wallet);

    return res.status(200).send({ key });
  } catch (err) {
    logger.error(err);
    return res.status(500).send("Something went wrong.");
  }
};

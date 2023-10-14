import express, { Application } from "express";

import { login, requestKey } from "@/controllers/auth";
import requestSchemaValidator from "@/middlewares/schema/schemaValidator";
import { loginSchema, requestLoginKeySchema } from "@/routes/schemas/auth";

const router = express.Router();

router.post("/login", requestSchemaValidator(loginSchema), login);
router.get(
  "/request-key/:wallet",
  requestSchemaValidator(requestLoginKeySchema),
  requestKey
);

export default (app: Application) => app.use("/auth", router);

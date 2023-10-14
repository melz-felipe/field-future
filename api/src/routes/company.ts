import express, { Application } from "express";

import { createCompany } from "@/controllers/company";
import { isAuth } from "@/middlewares/auth/isAuth";

const router = express.Router();

router.post("/create", isAuth, createCompany);

export default (app: Application) => app.use("/company", router);

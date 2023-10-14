import e from "express";
import authRoutes from "./auth";
import companyRoutes from "./company";

const routes = (app: e.Application) => {
  authRoutes(app);
  companyRoutes(app);
};

export default routes;

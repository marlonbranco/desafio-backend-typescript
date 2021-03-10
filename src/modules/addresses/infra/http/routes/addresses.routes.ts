import { Router } from "express";

import AddressesController from "../controllers/AddressesController";
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

const addressesRouter = Router();
const addressesController = new AddressesController();

addressesRouter.get("/", ensureAuthenticated, addressesController.list);

export default addressesRouter;

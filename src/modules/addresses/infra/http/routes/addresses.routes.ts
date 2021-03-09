import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import AddressesController from "../controllers/AddressesController";
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

const addressesRouter = Router();
const addressesController = new AddressesController();

addressesRouter.use(ensureAuthenticated);
addressesRouter.get("/", ensureAuthenticated, addressesController.list);
addressesRouter.delete("/:id", ensureAuthenticated, addressesController.delete);
addressesRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      address: Joi.string().required(),
      city: Joi.string().required(),
      complement: Joi.string().default(""),
      number: Joi.string().required(),
      postal_code: Joi.string().required(),
      state: Joi.string().required(),
    },
  }),
  addressesController.create
);

export default addressesRouter;

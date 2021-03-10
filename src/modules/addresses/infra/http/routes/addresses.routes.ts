import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import AddressesController from "../controllers/AddressesController";
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

const addressesRouter = Router();
const addressesController = new AddressesController();

addressesRouter.use(ensureAuthenticated);

addressesRouter.post(
  "/:user_id",
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

addressesRouter.get("/", ensureAuthenticated, addressesController.list);
addressesRouter.get(
  "/address/:id",
  ensureAuthenticated,
  addressesController.show
);

addressesRouter.put(
  "/address/:id",
  celebrate({
    [Segments.BODY]: {
      address: Joi.string(),
      city: Joi.string(),
      complement: Joi.string().default(""),
      number: Joi.string(),
      postal_code: Joi.string(),
      state: Joi.string(),
    },
  }),
  addressesController.update
);

addressesRouter.delete("/address/:id", addressesController.delete);

export default addressesRouter;

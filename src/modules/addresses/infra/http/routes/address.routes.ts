import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import AddressesController from "../controllers/AddressesController";
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

const addressRouter = Router();
const addressesController = new AddressesController();

addressRouter.use(ensureAuthenticated);

addressRouter.post(
  "/:id",
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

addressRouter.put(
  "/:id",
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

addressRouter.delete("/:id", addressesController.delete);

export default addressRouter;

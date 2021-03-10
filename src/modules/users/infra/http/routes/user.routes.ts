import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import UserAddressesController from "@modules/users/infra/http/controllers/UserAddressesController";
import UsersController from "../controllers/UsersController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const userRouter = Router();
const usersController = new UsersController();
const userAddressesController = new UserAddressesController();

userRouter.get("/:id", ensureAuthenticated, usersController.show);

userRouter.get(
  "/addresses/:id",
  ensureAuthenticated,
  userAddressesController.index
);

userRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      age: Joi.number().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      weight: Joi.number().required(),
      phone: Joi.string().required(),
      ethinicity: Joi.string().required(),
    },
  }),
  usersController.create
);

userRouter.put(
  "/:id",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      age: Joi.number().required(),
      email: Joi.string().email().required(),
      weight: Joi.number().required(),
      phone: Joi.string().required(),
      ethinicity: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  usersController.update
);

userRouter.delete("/:id", ensureAuthenticated, usersController.delete);

export default userRouter;

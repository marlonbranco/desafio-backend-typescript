import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import UsersController from "../controllers/UsersController";
import UserAddressesController from "@modules/users/infra/http/controllers/UserAddressesController";
import ProfileController from "../controllers/ProfileController";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const usersRouter = Router();
const usersController = new UsersController();
const userAddressesController = new UserAddressesController();
const profileController = new ProfileController();

usersRouter.post(
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

usersRouter.get("/", ensureAuthenticated, usersController.list);
usersRouter.get("/user/:id", ensureAuthenticated, usersController.show);

usersRouter.get(
  "/user/addresses/:id",
  ensureAuthenticated,
  userAddressesController.index
);

usersRouter.put(
  "/profile",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      age: Joi.number().required(),
      email: Joi.string().email().required(),
      weight: Joi.number().required(),
      phone: Joi.string().required(),
      ethinicity: Joi.string().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref("password")),
    },
  }),
  ensureAuthenticated,
  profileController.index
);
usersRouter.put(
  "/user/:id",
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

usersRouter.delete("/user/:id", ensureAuthenticated, usersController.delete);
export default usersRouter;

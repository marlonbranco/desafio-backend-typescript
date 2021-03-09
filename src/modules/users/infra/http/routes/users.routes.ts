import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import UsersController from "../controllers/UsersController";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const usersRouter = Router();
const usersController = new UsersController();

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

usersRouter.put(
  "/",
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      age: Joi.number().required(),
      email: Joi.string().email().required(),
      weight: Joi.number().required(),
      phone: Joi.string().required(),
      ethinicity: Joi.string().required(),
      old_password: Joi.string(),
      password: Joi.when("old_password", {
        is: Joi.exist(),
        then: Joi.required(),
      }),
      password_confirmation: Joi.when("password", {
        is: Joi.exist(),
        then: Joi.valid(Joi.ref("password")).required(),
      }),
    },
  })
);

usersRouter.delete("/:id", ensureAuthenticated, usersController.delete);

usersRouter.get("/", ensureAuthenticated, usersController.list);

export default usersRouter;

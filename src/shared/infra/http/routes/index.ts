import { Router } from "express";

import usersRouter from "@modules/users/infra/http/routes/users.routes";
import userRouter from "@modules/users/infra/http/routes/user.routes";
import profileRouter from "@modules/users/infra/http/routes/profile.routes";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import addressRouter from "@modules/addresses/infra/http/routes/address.routes";
import addressesRouter from "@modules/addresses/infra/http/routes/addresses.routes";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/users", usersRouter);
routes.use("/profile", profileRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/address", addressRouter);
routes.use("/addresses", addressesRouter);
export default routes;

import { Router } from "express";

import usersRouter from "@modules/users/infra/http/routes/users.routes";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import profileRouter from "@modules/users/infra/http/routes/profile.routes";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/profile", profileRouter);
routes.use("/sessions", sessionsRouter);
export default routes;

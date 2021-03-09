import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import CreateUserService from "@modules/users/services/CreateUserService";
import DeleteUserService from "@modules/users/services/DeleteUserService";
import ListUsersService from "@modules/users/services/ListUsersService";

export default class UsersController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.params.id;

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute(user_id);

    return response.json().status(200);
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      age,
      email,
      password,
      weight,
      phone,
      ethinicity,
    } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      age,
      email,
      password,
      weight,
      phone,
      ethinicity,
    });

    return response.json(classToClass(user));
  }
  public async list(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersService);

    const users = await listUsers.execute();

    return response.json(classToClass(users));
  }
}

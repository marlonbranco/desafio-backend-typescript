import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import UpdateUserProfileService from "@modules/users/services/UpdateUserProfileService";

export default class ProfileController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
      name,
      age,
      email,
      weight,
      phone,
      ethinicity,
      old_password,
      password,
    } = request.body;

    const updateUser = container.resolve(UpdateUserProfileService);

    const user = await updateUser.execute({
      user_id,
      name,
      age,
      email,
      weight,
      phone,
      ethinicity,
      old_password,
      password,
    });

    return response.json(classToClass(user));
  }
}

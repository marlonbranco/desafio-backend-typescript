import { Request, Response } from "express";
import { container } from "tsyringe";

import UpdateUserProfileService from "@modules/users/services/UpdateUserProfileService";

export default class ProfileController {
  public async update(request: Request, response: Response): Promise<Response> {
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

    const updateProfile = container.resolve(UpdateUserProfileService);

    const user = await updateProfile.execute({
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

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
      weight: user.weight,
      phone: user.phone,
      ethinicity: user.ethinicity,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(userWithoutPassword);
  }
}

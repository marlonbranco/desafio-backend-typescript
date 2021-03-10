import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import User from "../infra/typeorm/entities/User";
import IHashProvider from "../providers/HashProvider/modules/IHashProvider";

interface IRequest {
  user_id: string;
  name: string;
  phone: string;
  email: string;
  password?: string;
  old_password?: string;
  age: number;
  weight: number;
  ethinicity: string;
}

@injectable()
class UpdateUserProfileService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    user_id,
    name,
    age,
    email,
    password,
    old_password,
    ethinicity,
    phone,
    weight,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found.");
    }
    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError("E-mail already in use.");
    }
    user.name = name;
    user.email = email;
    user.age = age;
    user.ethinicity = ethinicity;
    user.phone = phone;
    user.weight = weight;

    if (password && !old_password) {
      throw new AppError(
        "You need to inform the old password to set a new password."
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password
      );

      if (!checkOldPassword) {
        throw new AppError("Old Password does not match.");
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateUserProfileService;

import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import User from "../infra/typeorm/entities/User";
import IHashProvider from "../providers/HashProvider/modules/IHashProvider";

interface IRequest {
  name: string;
  phone: string;
  email: string;
  password: string;
  age: number;
  weight: number;
  ethinicity: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    name,
    age,
    email,
    password,
    ethinicity,
    phone,
    weight,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("Email address already registered.");
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      age,
      email,
      password: hashedPassword,
      ethinicity,
      phone,
      weight,
    });

    return user;
  }
}

export default CreateUserService;

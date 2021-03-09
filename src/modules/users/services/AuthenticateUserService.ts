import "dotenv/config";
import { sign } from "jsonwebtoken";
import { injectable, inject } from "tsyringe";

import authConfig from "@config/auth";
import AppError from "@shared/errors/AppError";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import User from "../infra/typeorm/entities/User";
import IHashProvider from "../providers/HashProvider/modules/IHashProvider";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Invalid email/password", 401);
    }

    const matchedPassword = await this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!matchedPassword) {
      throw new AppError("Invalid email/password", 401);
    }

    const { expiresIn, secret } = authConfig.jwt;

    if (!secret) {
      throw new AppError("Secret is not defined on the configuration.");
    }

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default CreateUserService;

import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";

@injectable()
class DeleteUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute(user_id: string): Promise<void> {
    const checkUserExists = await this.usersRepository.findById(user_id);

    if (!checkUserExists) {
      throw new AppError("The user ID provided does not exist.");
    }

    await this.usersRepository.delete(user_id);

    return;
  }
}

export default DeleteUserService;

import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import IAddressesRepository from "../repositories/IAddressesRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import Address from "../infra/typeorm/entities/Address";

interface IRequest {
  user_id: string;
  address: string;
  number: string;
  complement?: string;
  postal_code: string;
  city: string;
  state: string;
}

@injectable()
class CreateAddressService {
  constructor(
    @inject("AddressesRepository")
    private addressesRepository: IAddressesRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    user_id,
    address,
    city,
    complement,
    number,
    postal_code,
    state,
  }: IRequest): Promise<Address> {
    const checkUserExists = await this.usersRepository.findById(user_id);

    if (!checkUserExists) {
      throw new AppError("User does not exist.");
    }
    const userAddress = await this.addressesRepository.create({
      user_id,
      address,
      city,
      complement,
      number,
      postal_code,
      state,
    });

    return userAddress;
  }
}

export default CreateAddressService;

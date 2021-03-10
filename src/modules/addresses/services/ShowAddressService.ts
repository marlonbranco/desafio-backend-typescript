import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import IAddressesRepository from "../repositories/IAddressesRepository";
import Address from "../infra/typeorm/entities/Address";

interface IRequest {
  address_id: string;
}

@injectable()
class ListAddressesService {
  constructor(
    @inject("AddressesRepository")
    private addressesRepository: IAddressesRepository
  ) {}

  public async execute({ address_id }: IRequest): Promise<Address> {
    const address = await this.addressesRepository.findById(address_id);

    if (!address) {
      throw new AppError("Address does not exist.");
    }

    return address;
  }
}

export default ListAddressesService;

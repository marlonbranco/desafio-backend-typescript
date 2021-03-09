import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import IAddressesRepository from "@modules/addresses/repositories/IAddressesRepository";

@injectable()
class DeleteAddressService {
  constructor(
    @inject("AddressesRepository")
    private addressesRepository: IAddressesRepository
  ) {}

  public async execute(address_id: string): Promise<void> {
    const checkAddessExists = await this.addressesRepository.findById(
      address_id
    );

    if (!checkAddessExists) {
      throw new AppError("The address ID provided does not exist.");
    }

    await this.addressesRepository.delete(address_id);

    return;
  }
}

export default DeleteAddressService;

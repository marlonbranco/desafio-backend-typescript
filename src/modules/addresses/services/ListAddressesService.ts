import { injectable, inject } from "tsyringe";

import IAddressesRepository from "../repositories/IAddressesRepository";
import Address from "../infra/typeorm/entities/Address";

@injectable()
class ListAddressesService {
  constructor(
    @inject("AddressesRepository")
    private addressesRepository: IAddressesRepository
  ) {}

  public async execute(): Promise<Address[]> {
    const listAddresses = this.addressesRepository.findAllAddresses();

    return listAddresses;
  }
}

export default ListAddressesService;

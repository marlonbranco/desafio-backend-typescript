import { injectable, inject } from "tsyringe";

import IAddressesRepository from "../repositories/IAddressesRepository";
import Address from "../infra/typeorm/entities/Address";

@injectable()
class ListUserAddressesService {
  constructor(
    @inject("AddressesRepository")
    private addressesRepository: IAddressesRepository
  ) {}

  public async execute(user_id: string): Promise<Address[]> {
    const listAddresses = this.addressesRepository.findByUserId(user_id);

    return listAddresses;
  }
}

export default ListUserAddressesService;

import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import IAddressesRepository from "@modules/addresses/repositories/IAddressesRepository";
import Address from "../infra/typeorm/entities/Address";

interface IRequest {
  address_id: string;
  address: string;
  number: string;
  complement?: string;
  postal_code: string;
  city: string;
  state: string;
}

@injectable()
class UpdateAddressService {
  constructor(
    @inject("AddressesRepository")
    private addressesRepository: IAddressesRepository
  ) {}

  public async execute({
    address_id,
    address,
    city,
    complement,
    number,
    postal_code,
    state,
  }: IRequest): Promise<Address> {
    const userAddress = await this.addressesRepository.findById(address_id);

    if (!userAddress) {
      throw new AppError("Address not found.");
    }
    if (!complement) {
      complement = "";
    }
    userAddress.address = address;
    userAddress.number = number;
    userAddress.complement = complement;
    userAddress.city = city;
    userAddress.state = state;
    userAddress.postal_code = postal_code;

    return this.addressesRepository.save(userAddress);
  }
}

export default UpdateAddressService;

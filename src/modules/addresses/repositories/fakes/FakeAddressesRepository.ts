import { v4 as uuid } from "uuid";

import IAddressesRepository from "../IAddressesRepository";
import ICreateAddressDTO from "../../dtos/ICreateAddressDTO";
import Address from "../../infra/typeorm/entities/Address";

class FakeAddressesRepository implements IAddressesRepository {
  private addresses: Address[] = [];

  public async findById(id: string): Promise<Address | undefined> {
    const findAddress = this.addresses.find((address) => address.id === id);

    return findAddress;
  }

  public async findByUserId(user_id: string): Promise<Address[]> {
    const findUserAddresses = this.addresses.filter(
      (userAddress) => userAddress.user_id === user_id
    );

    return findUserAddresses;
  }

  public async findAllAddresses(): Promise<Address[]> {
    return this.addresses;
  }

  public async create({
    user_id,
    address,
    city,
    complement,
    number,
    postal_code,
    state,
  }: ICreateAddressDTO): Promise<Address> {
    const userAddress = new Address();

    Object.assign(userAddress, {
      id: uuid(),
      user_id,
      address,
      city,
      complement,
      number,
      postal_code,
      state,
    });

    this.addresses.push(userAddress);

    return userAddress;
  }

  public async save(address: Address): Promise<Address> {
    const findIndex = this.addresses.findIndex(
      (userAddress) => userAddress.id === address.id
    );

    this.addresses[findIndex] = address;

    return address;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.addresses.findIndex(
      (userAddress) => userAddress.id === id
    );

    this.addresses.splice(findIndex, 1);

    return;
  }
}

export default FakeAddressesRepository;

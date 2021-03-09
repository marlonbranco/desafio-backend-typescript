import { getRepository, Repository } from "typeorm";

import IAddressesRepository from "@modules/addresses/repositories/IAddressesRepository";
import ICreateAddressDTO from "@modules/addresses/dtos/ICreateAddressDTO";
import Address from "../entities/Address";

class AddressesRepository implements IAddressesRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }
  public async findById(id: string): Promise<Address | undefined> {
    const findAddress = this.ormRepository.findOne(id);

    return findAddress;
  }
  public async findByUserId(user_id: string): Promise<Address[]> {
    const findUserAddresses = this.ormRepository.find({
      where: { user_id },
    });

    return findUserAddresses;
  }

  public async findAllAddresses(): Promise<Address[]> {
    const listAddresses = this.ormRepository.find();

    return listAddresses;
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
    const userAddress = this.ormRepository.create({
      user_id,
      address,
      city,
      complement,
      number,
      postal_code,
      state,
    });

    await this.ormRepository.save(userAddress);

    return userAddress;
  }

  public async save(address: Address): Promise<Address> {
    return this.ormRepository.save(address);
  }

  public async delete(id: string): Promise<void> {
    this.ormRepository.delete(id);

    return;
  }
}

export default AddressesRepository;

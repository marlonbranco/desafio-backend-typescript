import ICreateAddressDTO from "@modules/addresses/dtos/ICreateAddressDTO";
import Address from "../infra/typeorm/entities/Address";

export default interface IUsersRepository {
  findById(id: string): Promise<Address | undefined>;
  findByUserId(user_id: string): Promise<Address[]>;
  findAllAddresses(): Promise<Address[]>;
  create(data: ICreateAddressDTO): Promise<Address>;
  save(address: Address): Promise<Address>;
  delete(id: string): Promise<void>;
}

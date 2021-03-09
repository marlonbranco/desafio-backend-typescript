import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import User from "../infra/typeorm/entities/User";

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByName(name: string): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findByEthinicity(ethinicity: string): Promise<User[]>;
  findByAge(age: number): Promise<User[]>;
  findByWeight(weight: number): Promise<User[]>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}

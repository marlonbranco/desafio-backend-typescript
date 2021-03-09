import { getRepository, Repository } from "typeorm";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import User from "../entities/User";

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }
  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne(id);

    return findUser;
  }

  public async findByName(name: string): Promise<User[]> {
    const findUser = await this.ormRepository.find({
      where: { name },
    });

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { email },
    });

    return findUser;
  }

  public async findByEthinicity(ethinicity: string): Promise<User[]> {
    const listUsers = await this.ormRepository.find({
      where: { ethinicity },
    });

    return listUsers;
  }

  public async findByAge(age: number): Promise<User[]> {
    const listUsers = await this.ormRepository.find({
      where: { age },
    });

    return listUsers;
  }

  public async findByWeight(weight: number): Promise<User[]> {
    const listUsers = await this.ormRepository.find({
      where: { weight },
    });

    return listUsers;
  }

  public async create({
    name,
    age,
    email,
    password,
    weight,
    phone,
    ethinicity,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      age,
      email,
      password,
      weight,
      phone,
      ethinicity,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
    return;
  }
}

export default UsersRepository;

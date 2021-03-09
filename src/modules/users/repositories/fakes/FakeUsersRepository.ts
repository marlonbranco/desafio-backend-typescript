import { v4 as uuid } from "uuid";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import User from "../../infra/typeorm/entities/User";

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.id === id);

    return findUser;
  }

  public async findByName(name: string): Promise<User[]> {
    const findUser = this.users.filter((user) => user.name === name);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.email === email);

    return findUser;
  }
  public async findByEthinicity(ethinicity: string): Promise<User[]> {
    const findUser = this.users.filter(
      (user) => user.ethinicity === ethinicity
    );

    return findUser;
  }

  public async findByAge(age: number): Promise<User[]> {
    const findUser = this.users.filter((user) => user.age === age);

    return findUser;
  }

  public async findByWeight(weight: number): Promise<User[]> {
    const findUser = this.users.filter((user) => user.weight === weight);

    return findUser;
  }

  public async create({
    name,
    age,
    email,
    password,
    ethinicity,
    weight,
    phone,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuid(),
      name,
      age,
      email,
      password,
      ethinicity,
      weight,
      phone,
    });

    this.users.push(user);

    return user;
  }
  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === user.id
    );

    this.users[findIndex] = user;

    return user;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.users.findIndex((findUser) => findUser.id === id);

    this.users.splice(findIndex, 1);

    return;
  }
}

export default FakeUsersRepository;

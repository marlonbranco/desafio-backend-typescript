import AppError from "@shared/errors/AppError";

import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import CreateUserService from "./CreateUserService";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe("CreateUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it("should be able to create a new user", async () => {
    const user = await createUser.execute({
      name: "John Doe",
      age: 26,
      email: "johndoe@example.com",
      password: "123456",
      ethinicity: "Human",
      phone: "(00)12345-11111",
      weight: 80,
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create two users with the same email", async () => {
    await createUser.execute({
      name: "John Doe",
      age: 26,
      email: "johndoe@example.com",
      password: "123456",
      ethinicity: "Human",
      phone: "(00)12345-11111",
      weight: 80,
    });
    await expect(
      createUser.execute({
        name: "John Doe",
        age: 30,
        email: "johndoe@example.com",
        password: "123456",
        ethinicity: "Human",
        phone: "(00)12345-11111",
        weight: 80,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

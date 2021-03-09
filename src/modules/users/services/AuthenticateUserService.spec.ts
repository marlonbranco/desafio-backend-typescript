import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe("AuthenticateUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });
  it("should be able to authenticate", async () => {
    const user = await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
      age: 26,
      ethinicity: "Human",
      phone: "(00)12345-11111",
      weight: 80,
    });

    const response = await authenticateUser.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(response).toHaveProperty("token");
    expect(response.user).toEqual(user);
  });

  it("should not be able to authenticate a non existent user", async () => {
    await expect(
      authenticateUser.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with wrong password", async () => {
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
      authenticateUser.execute({
        email: "johndoe@example.com",
        password: "wrong-password",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

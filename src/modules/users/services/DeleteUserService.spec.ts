import AppError from "@shared/errors/AppError";

import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import CreateUserService from "./CreateUserService";
import DeleteUserService from "./DeleteUserService";

let fakeUsersRepository: FakeUsersRepository;
let deleteUser: DeleteUserService;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe("DeleteUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    deleteUser = new DeleteUserService(fakeUsersRepository);
  });

  it("should be able to delete user", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      age: 26,
      email: "johndoe@example.com",
      password: "123456",
      ethinicity: "human",
      phone: "(00)12345-11111",
      weight: 80,
    });

    const deletedUser = await deleteUser.execute(user.id);

    expect(deletedUser).toBeUndefined();
  });
  it("should not be able to delete a user that does not exist", async () => {
    await expect(
      deleteUser.execute("non-existent-user")
    ).rejects.toBeInstanceOf(AppError);
  });
});

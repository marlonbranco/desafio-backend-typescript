import AppError from "@shared/errors/AppError";

import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import UpdateUserProfileService from "./UpdateUserProfileService";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateUserProfileService;

describe("UpdateUserProfile", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateUserProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it("should be able to update the profile", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      age: 26,
      email: "johndoe@example.com",
      password: "123456",
      ethinicity: "Human",
      phone: "(00) 12345-11111",
      weight: 80,
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "John Trê",
      age: 30,
      email: "johntre@example.com",
      ethinicity: "Dog",
      phone: "(00) 45678-2222",
      weight: 70,
    });
    expect(updatedUser.name).toBe("John Trê");
    expect(updatedUser.email).toBe("johntre@example.com");
    expect(updatedUser.age).toBe(30);
    expect(updatedUser.ethinicity).toBe("Dog");
    expect(updatedUser.phone).toBe("(00) 45678-2222");
    expect(updatedUser.weight).toBe(70);
  });

  it("should not be able to change to another user email", async () => {
    await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
      age: 26,
      ethinicity: "Human",
      phone: "(00)12345-11111",
      weight: 80,
    });

    const user = await fakeUsersRepository.create({
      name: "Test",
      email: "test@example.com",
      password: "123123",
      age: 26,
      ethinicity: "Test",
      phone: "(00)0000-0000",
      weight: 80,
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: "John Doe",
        email: "johndoe@example.com",
        age: 26,
        ethinicity: "Test",
        phone: "(00)0000-0000",
        weight: 80,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to update the password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
      age: 26,
      ethinicity: "Human",
      phone: "(00)12345-11111",
      weight: 80,
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "John Trê",
      email: "johntre@example.com",
      age: 26,
      ethinicity: "Human",
      phone: "(00)12345-11111",
      weight: 80,
      old_password: "123456",
      password: "123123",
    });
    expect(updatedUser.password).toBe("123123");
  });

  it("should not be able to update the password without the old password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
      age: 26,
      ethinicity: "Human",
      phone: "(00)12345-11111",
      weight: 80,
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: "John Trê",
        email: "johntre@example.com",
        age: 26,
        ethinicity: "Human",
        phone: "(00)12345-11111",
        weight: 80,
        password: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update the password with the wrong old password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
      age: 26,
      ethinicity: "Human",
      phone: "(00)12345-11111",
      weight: 80,
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: "John Trê",
        email: "johntre@example.com",
        age: 26,
        ethinicity: "Human",
        phone: "(00)12345-11111",
        weight: 80,
        old_password: "wrong-old-password",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update the profile of non existent user", async () => {
    await expect(
      updateProfile.execute({
        user_id: "non-existent-user",
        name: "Test",
        email: "test@example.com",
        age: 0,
        ethinicity: "non-existent",
        phone: "(00)00000-0000",
        weight: 0,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

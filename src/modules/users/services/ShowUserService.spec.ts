import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import ShowUserService from "./ShowUserService";

let fakeUsersRepository: FakeUsersRepository;
let showUser: ShowUserService;

describe("ShowUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showUser = new ShowUserService(fakeUsersRepository);
  });
  it("should be able to show the user information", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
      age: 26,
      ethinicity: "Human",
      phone: "(00) 12345-11111",
      weight: 80,
    });

    const userData = await showUser.execute({
      user_id: user.id,
    });

    expect(userData.name).toBe("John Doe");
    expect(userData.email).toBe("johndoe@example.com");
    expect(userData.password).toBe("123456");
    expect(userData.age).toBe(26);
    expect(userData.ethinicity).toBe("Human");
    expect(userData.phone).toBe("(00) 12345-11111");
    expect(userData.weight).toBe(80);
  });
  it("should not be able to show the information of non existent user", async () => {
    await expect(
      showUser.execute({
        user_id: "non-existent-user",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import ListUsersService from "@modules/users/services/ListUsersService";

let fakeUsersRepository: FakeUsersRepository;
let listUsers: ListUsersService;

describe("ListUsers", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listUsers = new ListUsersService(fakeUsersRepository);
  });
  it("should be able to list all users", async () => {
    const user1 = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
      age: 26,
      ethinicity: "Human",
      phone: "(00) 12345-11111",
      weight: 80,
    });

    const user2 = await fakeUsersRepository.create({
      name: "John Trê",
      email: "johntre@example.com",
      password: "123456",
      age: 26,
      ethinicity: "Robot",
      phone: "(00) 12345-11111",
      weight: 80,
    });

    const user3 = await fakeUsersRepository.create({
      name: "John Qua",
      email: "johnqua@example.com",
      password: "123456",
      age: 26,
      ethinicity: "Tree",
      phone: "(00) 12345-11111",
      weight: 80,
    });

    const usersList = await listUsers.execute();

    expect(usersList).toEqual([user1, user2, user3]);
  });
});

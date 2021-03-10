import FakeAddressesRepository from "../repositories/fakes/FakeAddressesRepository";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import CreateAddressService from "./CreateAddressService";

let fakeAddressesRepository: FakeAddressesRepository;
let fakeUsersRepository: FakeUsersRepository;
let createAddress: CreateAddressService;

describe("CreateAddress", () => {
  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressesRepository();
    fakeUsersRepository = new FakeUsersRepository();
    createAddress = new CreateAddressService(
      fakeAddressesRepository,
      fakeUsersRepository
    );
  });

  it("should be able to create a new address", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      age: 26,
      email: "johndoe@example.com",
      password: "123456",
      ethinicity: "Human",
      phone: "(00)12345-11111",
      weight: 80,
    });
    const userAddress = await createAddress.execute({
      user_id: user.id,
      address: "Some Address",
      city: "Some City",
      complement: "",
      number: "0",
      postal_code: "12345-678",
      state: "Some State",
    });

    expect(userAddress).toHaveProperty("id");
  });
});

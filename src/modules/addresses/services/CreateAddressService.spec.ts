import FakeAddressesRepository from "../repositories/fakes/FakeAddressesRepository";
import CreateAddressService from "./CreateAddressService";

let fakeAddressesRepository: FakeAddressesRepository;
let createAddress: CreateAddressService;

describe("CreateAddress", () => {
  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressesRepository();
    createAddress = new CreateAddressService(fakeAddressesRepository);
  });

  it("should be able to create a new address", async () => {
    const userAddress = await createAddress.execute({
      user_id: "user",
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

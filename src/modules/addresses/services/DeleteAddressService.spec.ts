import AppError from "@shared/errors/AppError";

import FakeAddressesRepository from "../repositories/fakes/FakeAddressesRepository";
import CreateAddressService from "./CreateAddressService";
import DeleteAddressService from "./DeleteAddressService";

let fakeUsersRepository: FakeAddressesRepository;
let createAddress: CreateAddressService;
let deleteAddress: DeleteAddressService;

describe("DeleteAddress", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeAddressesRepository();
    createAddress = new CreateAddressService(fakeUsersRepository);
    deleteAddress = new DeleteAddressService(fakeUsersRepository);
  });

  it("should be able to delete address", async () => {
    const userAddress = await createAddress.execute({
      user_id: "user",
      address: "Some Address",
      city: "Some City",
      complement: "",
      number: "0",
      postal_code: "12345-678",
      state: "Some State",
    });

    const deletedAddress = await deleteAddress.execute(userAddress.id);

    expect(deletedAddress).toBeUndefined();
  });
  it("should not be able to delete an address that does not exist", async () => {
    await expect(
      deleteAddress.execute("non-existent-address")
    ).rejects.toBeInstanceOf(AppError);
  });
});

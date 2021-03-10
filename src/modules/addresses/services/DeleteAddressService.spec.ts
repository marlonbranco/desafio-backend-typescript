import AppError from "@shared/errors/AppError";

import FakeAddressesRepository from "../repositories/fakes/FakeAddressesRepository";
import DeleteAddressService from "./DeleteAddressService";

let fakeAddressesRepository: FakeAddressesRepository;
let deleteAddress: DeleteAddressService;

describe("DeleteAddress", () => {
  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressesRepository();
    deleteAddress = new DeleteAddressService(fakeAddressesRepository);
  });

  it("should be able to delete address", async () => {
    const userAddress = await fakeAddressesRepository.create({
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

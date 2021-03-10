import AppError from "@shared/errors/AppError";

import FakeAddressesRepository from "../repositories/fakes/FakeAddressesRepository";
import UpdateAddressesService from "./UpdateAddressService";

let fakeAddressesRepository: FakeAddressesRepository;
let updateAddress: UpdateAddressesService;

describe("UpdateAddress", () => {
  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressesRepository();
    updateAddress = new UpdateAddressesService(fakeAddressesRepository);
  });

  it("should be able to update the address", async () => {
    const userAddress = await fakeAddressesRepository.create({
      user_id: "user",
      address: "Some Address",
      city: "Some City",
      complement: "",
      number: "0",
      postal_code: "12345-678",
      state: "Some State",
    });

    const updatedAddress = await updateAddress.execute({
      address_id: userAddress.id,
      address: "Another Address",
      city: "Another City",
      complement: "Another Appartment",
      number: "10",
      postal_code: "876-54321",
      state: "Another State",
    });
    expect(updatedAddress.address).toBe("Another Address");
    expect(updatedAddress.number).toBe("10");
    expect(updatedAddress.complement).toBe("Another Appartment");
    expect(updatedAddress.city).toBe("Another City");
    expect(updatedAddress.postal_code).toBe("876-54321");
    expect(updatedAddress.state).toBe("Another State");
  });

  it("should not be able to update an address that does not exist", async () => {
    await expect(
      updateAddress.execute({
        address_id: "non-existent-address",
        address: "Fake Address",
        city: "Fake City",
        complement: "",
        number: "0",
        postal_code: "12345-678",
        state: "Fake State",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

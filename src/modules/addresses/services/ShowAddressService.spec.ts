import AppError from "@shared/errors/AppError";

import FakeAddressesRepository from "../repositories/fakes/FakeAddressesRepository";
import ShowAddressServicew from "./ShowAddressService";

let fakeAddressesRepository: FakeAddressesRepository;
let showAddress: ShowAddressServicew;

describe("ShowAddress", () => {
  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressesRepository();
    showAddress = new ShowAddressServicew(fakeAddressesRepository);
  });
  it("should be able to show the address information", async () => {
    const address = await fakeAddressesRepository.create({
      user_id: "user",
      address: "Some Address",
      city: "Some City",
      complement: "",
      number: "0",
      postal_code: "12345-678",
      state: "Some State",
    });

    const addressData = await showAddress.execute({
      address_id: address.id,
    });

    expect(addressData.user_id).toBe("user");
    expect(addressData.address).toBe("Some Address");
    expect(addressData.city).toBe("Some City");
    expect(addressData.complement).toBe("");
    expect(addressData.number).toBe("0");
    expect(addressData.postal_code).toBe("12345-678");
    expect(addressData.state).toBe("Some State");
  });
  it("should not be able to show the information of non existent address", async () => {
    await expect(
      showAddress.execute({
        address_id: "non-existent-address",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

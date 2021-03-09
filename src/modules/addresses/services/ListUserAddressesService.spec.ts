import FakeAddressesRepository from "@modules/addresses/repositories/fakes/FakeAddressesRepository";
import ListUserAddressesService from "@modules/addresses/services/ListUserAddressesService";

let fakeAddressesRepository: FakeAddressesRepository;
let listUserAddresses: ListUserAddressesService;

describe("ListUserAddresses", () => {
  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressesRepository();
    listUserAddresses = new ListUserAddressesService(fakeAddressesRepository);
  });
  it("should be able to list all addresses from user", async () => {
    const address1 = await fakeAddressesRepository.create({
      user_id: "user",
      address: "Some Address",
      city: "Some City",
      complement: "",
      number: "0",
      postal_code: "12345-678",
      state: "Some State",
    });

    const address2 = await await fakeAddressesRepository.create({
      user_id: "user",
      address: "Some Other Address",
      city: "Some City",
      complement: "",
      number: "0",
      postal_code: "12345-678",
      state: "Some State",
    });

    const address3 = await await fakeAddressesRepository.create({
      user_id: "user",
      address: "Some Other Other Address",
      city: "Some City",
      complement: "",
      number: "0",
      postal_code: "12345-678",
      state: "Some State",
    });

    const addressesList = await listUserAddresses.execute("user");

    expect(addressesList).toEqual([address1, address2, address3]);
  });
});

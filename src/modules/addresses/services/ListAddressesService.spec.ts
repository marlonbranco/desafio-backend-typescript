import FakeAddressesRepository from "@modules/addresses/repositories/fakes/FakeAddressesRepository";
import ListAddressesService from "@modules/addresses/services/ListAddressesService";

let fakeAddressesRepository: FakeAddressesRepository;
let listAddresses: ListAddressesService;

describe("ListAddresses", () => {
  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressesRepository();
    listAddresses = new ListAddressesService(fakeAddressesRepository);
  });
  it("should be able to list all addresses", async () => {
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
      city: "Some Other City",
      complement: "",
      number: "0",
      postal_code: "12345-678",
      state: "Some Other State",
    });

    const address3 = await await fakeAddressesRepository.create({
      user_id: "user",
      address: "Some Other Other Address",
      city: "Some Other Other City",
      complement: "",
      number: "0",
      postal_code: "12345-678",
      state: "Some Other Other State",
    });

    const addressesList = await listAddresses.execute();

    expect(addressesList).toEqual([address1, address2, address3]);
  });
});

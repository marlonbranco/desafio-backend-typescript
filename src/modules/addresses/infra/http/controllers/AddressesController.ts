import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateAddressService from "@modules/addresses/services/CreateAddressService";
import DeleteAddressService from "@modules/addresses/services/DeleteAddressService";
import ListAddressesService from "@modules/addresses/services/ListAddressesService";

export default class AddressesController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const address_id = request.params.id;

    const deleteAddress = container.resolve(DeleteAddressService);

    await deleteAddress.execute(address_id);

    return response.json().status(200);
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
      address,
      city,
      complement,
      number,
      postal_code,
      state,
    } = request.body;

    const createAddres = container.resolve(CreateAddressService);

    const userAddress = await createAddres.execute({
      user_id,
      address,
      city,
      complement,
      number,
      postal_code,
      state,
    });

    return response.json(userAddress);
  }
  public async list(request: Request, response: Response): Promise<Response> {
    const listAddresses = container.resolve(ListAddressesService);

    const addresses = await listAddresses.execute();

    return response.json(addresses);
  }
}

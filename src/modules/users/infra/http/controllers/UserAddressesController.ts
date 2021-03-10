import { Request, Response } from "express";
import { container } from "tsyringe";

import ListUserAddressesService from "@modules/addresses/services/ListUserAddressesService";

export default class AddressesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.params.id;
    const listAddresses = container.resolve(ListUserAddressesService);

    const addresses = await listAddresses.execute(user_id);

    return response.json(addresses);
  }
}

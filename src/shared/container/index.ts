import { container } from "tsyringe";

import "@modules/users/providers";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";

import IAddressesRepository from "@modules/addresses/repositories/IAddressesRepository";
import AddressesRepository from "@modules/addresses/infra/typeorm/repositories/AddressesRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IAddressesRepository>(
  "AddressesRepository",
  AddressesRepository
);

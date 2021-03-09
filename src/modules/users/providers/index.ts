import { container } from 'tsyringe';

import IHashProvider from './HashProvider/modules/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

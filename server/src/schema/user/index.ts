import { IsLoggedInDirective } from './directives';
export {userModule, IUserModuleConfig} from './module';


export const userSchemaDirectives = {
  auth: IsLoggedInDirective
};

import debug from 'debug';
import jwt from 'jsonwebtoken';
import { environment } from '../config/config';

const log = debug(`app:auth`);

interface IAuthTokenPayload {
  user: string | null,
  roles: string[],
}

const signedOutPayload: IAuthTokenPayload = {
  user: null,
  roles: [],
};

let lastUser: string | null = null;

export function getUser(token?: string): IAuthTokenPayload {
  if (!token) {
    log("Auth Fail - Missing token");

    return signedOutPayload;
  }
  try {
    const payload = jwt.verify(token,
        environment.jwtSecret ?? "") as IAuthTokenPayload | null;
    if (!payload?.user) {
      log("Auth failed -- user undefined")
      return signedOutPayload;}

    log(`Auth Succeeded - User: ${payload?.user}`);

    return payload;
  } catch {
    log("Auth Fail - Invalid token");
    return signedOutPayload;
  }
}


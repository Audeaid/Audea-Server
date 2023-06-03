import { CLERK_PEM } from '../../../../utils/auth';
import { extendType, nonNull, stringArg } from 'nexus';
import jwt from 'jsonwebtoken';

interface IVerifyJWT {
  azp: string;
  exp: number;
  iat: number;
  iss: string;
  nbf: number;
  sid: string;
  sub: string;
}

export const getClerkSessionId = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getClerkSessionId', {
      type: 'ClerkPayLoad',

      args: {
        jwtToken: nonNull(stringArg()),
      },

      async resolve(__, { jwtToken }, ____, ___) {
        try {
          const splitPem = CLERK_PEM.match(/.{1,64}/g);
          const publicKey =
            '-----BEGIN PUBLIC KEY-----\n' +
            splitPem?.join('\n') +
            '\n-----END PUBLIC KEY-----';

          const decoded = jwt.verify(jwtToken, publicKey) as IVerifyJWT;

          return { sessionId: decoded.sid };
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    });
  },
});

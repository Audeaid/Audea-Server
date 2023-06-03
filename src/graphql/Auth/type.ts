import { objectType } from 'nexus';

export const AuthPayLoad = objectType({
  name: 'AuthPayLoad',
  definition(t) {
    t.nonNull.string('token', {
      description: 'JWT Token',
    });
  },
});

export const ClerkPayLoad = objectType({
  name: 'ClerkPayLoad',
  definition(t) {
    t.nonNull.string('sessionId', {
      description: 'sessionId from clerk',
    });
  },
});

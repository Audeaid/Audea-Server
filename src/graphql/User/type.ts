import { enumType, objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.nonNull.string('email');
    t.nonNull.dateTime('createdAt');
    t.nonNull.field('signInProvider', {
      type: 'SignInProviderEnum',
    });
  },
});

export const SignInProviderEnum = enumType({
  name: 'SignInProviderEnum',
  members: ['GOOGLE', 'MICROSOFT', 'APPLE', 'PASSWORD'],
});

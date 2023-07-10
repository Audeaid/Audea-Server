import { objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('firstName');
    t.nonNull.string('lastName');
    t.nonNull.string('email');
    t.nonNull.dateTime('createdAt');
    t.nonNull.string('clerkUserId');
    t.string('username');
  },
});

export const DeletedUser = objectType({
  name: 'DeletedUser',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('email');
  },
});

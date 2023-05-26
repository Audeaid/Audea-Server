import { extendType, nonNull, stringArg } from 'nexus';

export const getDeletedUser = extendType({
  type: 'Query',
  definition(t) {
    t.field('getDeletedUser', {
      type: 'DeletedUser',

      args: {
        email: nonNull(stringArg()),
      },

      async resolve(__, { email }, { prisma }, ___) {
        try {
          const user = await prisma.deletedAccount.findFirst({
            where: { email },
          });

          return user;
        } catch (error) {
          throw error;
        }
      },
    });
  },
});

import { nonNull, stringArg, extendType } from 'nexus';

export const searchUserByEmail = extendType({
  type: 'Query',
  definition(t) {
    t.field('searchUserByEmail', {
      type: 'User',
      args: {
        email: nonNull(stringArg()),
      },

      async resolve(__, { email }, { prisma }, ___) {
        try {
          const user = await prisma.user.findFirst({
            where: { email },
          });

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          throw error;
        }
      },
    });
  },
});

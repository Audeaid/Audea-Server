import { nonNull, stringArg, extendType } from 'nexus';

export const searchUserByClerkId = extendType({
  type: 'Query',
  definition(t) {
    t.field('searchUserByClerkId', {
      type: 'User',

      args: {
        clerkUserId: nonNull(stringArg()),
      },

      async resolve(__, { clerkUserId }, { prisma }, ___) {
        try {
          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
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

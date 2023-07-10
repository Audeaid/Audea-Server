import { nonNull, stringArg, extendType } from 'nexus';

export const searchUserByUsername = extendType({
  type: 'Query',
  definition(t) {
    t.field('searchUserByUsername', {
      type: 'User',

      args: {
        username: nonNull(stringArg()),
      },

      async resolve(__, { username }, { prisma, clerkUserId }, ___) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          const searchUser = await prisma.user.findFirst({
            where: { username },
          });

          return searchUser ?? null;
        } catch (error) {
          throw error;
        }
      },
    });
  },
});

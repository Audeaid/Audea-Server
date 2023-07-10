import { extendType, nonNull, stringArg } from 'nexus';

export const addUsername = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('addUsername', {
      type: 'User',

      args: {
        username: nonNull(stringArg()),
      },

      async resolve(__, { username }, { prisma, clerkUserId }, ___) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          const searchIfUsernameIsTaken = await prisma.user.findFirst({
            where: { username },
          });

          if (searchIfUsernameIsTaken) throw new Error('Username is taken.');

          const response = await prisma.user.update({
            where: { id: user.id },
            data: { username },
          });

          return response;
        } catch (e) {
          throw e;
        }
      },
    });
  },
});

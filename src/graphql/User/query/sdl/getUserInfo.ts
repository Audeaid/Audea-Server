import { nonNull, stringArg, extendType } from 'nexus';

export const getUserInfo = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getUserInfo', {
      type: 'User',

      async resolve(__, ____, { clerkUserId, prisma }, ___) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          return user;
        } catch (error) {
          throw error;
        }
      },
    });
  },
});

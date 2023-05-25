import { nonNull, stringArg, extendType } from 'nexus';

export const getUserInfo = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getUserInfo', {
      type: 'User',

      async resolve(__, ____, { userId, prisma }, ___) {
        try {
          if (!userId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { id: userId },
          });

          return user;
        } catch (error) {
          throw error;
        }
      },
    });
  },
});

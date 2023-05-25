import { extendType } from 'nexus';

export const getUserSubscription = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getUserSubscription', {
      type: 'UserSubscription',

      async resolve(__, ____, { userId, prisma }, ___) {
        try {
          if (!userId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { id: userId },
          });

          const userSubscription = await prisma.subscription.findFirstOrThrow({
            where: { userId: user.id },
          });

          return {
            id: userSubscription.id,
            type: userSubscription.type,
            createdAt: userSubscription.createdAt,
            startDate: userSubscription.startDate,
            endDate: userSubscription.endDate,
            user,
            userId: user.id,
          };
        } catch (error) {
          throw error;
        }
      },
    });
  },
});

import { extendType } from 'nexus';

export const getUserSubscription = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getUserSubscription', {
      type: 'UserSubscription',

      async resolve(__, ____, { clerkUserId, prisma }, ___) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
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
            clerkUserId: userSubscription.clerkUserId,
            extended: userSubscription.extended,
          };
        } catch (error) {
          throw error;
        }
      },
    });
  },
});

import { extendType, nonNull, stringArg } from 'nexus';

export const getUserSubscriptionEDGE = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getUserSubscriptionEDGE', {
      type: 'UserSubscription',

      args: {
        secret: nonNull(stringArg()),
        clerkUserId: nonNull(stringArg()),
      },

      async resolve(__, { secret, clerkUserId }, { prisma }, ___) {
        try {
          if (secret !== process.env.CHECK_SUBSCRIPTION_SECRET)
            throw new Error('Invalid token');

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

import { arg, extendType, nonNull } from 'nexus';

export const getLifetimeSubscriptionCount = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getLifetimeSubscriptionCount', {
      type: 'ResponseMessage',

      args: {
        type: nonNull(
          arg({
            type: 'SubscriptionTypeEnum',
          })
        ),
      },

      async resolve(__, { type }, { prisma }, ___) {
        try {
          if (type !== 'LIFETIME60') throw new Error('Invalid type.');

          const lifetime = await prisma.subscription.findMany({
            where: { type },
          });

          return {
            response: lifetime.length.toString(),
          };
        } catch (error) {
          throw error;
        }
      },
    });
  },
});

import { extendType } from 'nexus';
import moment from 'moment';

export const extendTrialSubscription = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('extendTrialSubscription', {
      type: 'UserSubscription',

      async resolve(__, ____, { prisma, clerkUserId }, ___) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          const subscription = await prisma.subscription.findFirstOrThrow({
            where: { userId: user.id },
          });

          if (subscription.type !== 'TRIAL')
            throw new Error('Invalid subscription type to extend.');

          if (subscription.extended) throw new Error('Already extended trial!');

          const now = new Date();
          const endDate = new Date(moment(now).add('7', 'days').toISOString());

          const response = await prisma.subscription.update({
            where: { id: subscription.id },
            data: {
              startDate: now,
              endDate,
              extended: true,
            },
          });

          return {
            id: response.id,
            type: response.type,
            createdAt: response.createdAt,
            startDate: response.startDate,
            endDate: response.endDate,
            userId: response.userId,
            extended: response.extended,
            clerkUserId: response.clerkUserId,
            user,
          };
        } catch (e) {
          throw e;
        }
      },
    });
  },
});

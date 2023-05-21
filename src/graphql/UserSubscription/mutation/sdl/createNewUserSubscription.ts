import { arg, extendType } from 'nexus';
import { nonNull } from 'nexus';
import moment from 'moment';
import { Subscription } from '@prisma/client';

export const createNewUserSubscription = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createNewUserSubscription', {
      type: 'UserSubscription',
      args: {
        type: nonNull(
          arg({
            type: 'SubscriptionTypeEnum',
          })
        ),
      },

      async resolve(__, { type }, { prisma, userId }, ___) {
        try {
          if (!userId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { id: userId },
          });

          const startDate = new Date();
          let endDate: Date | null;

          if (type === 'TRIAL')
            endDate = new Date(
              moment(startDate).add('7', 'days').toLocaleString()
            );
          else if (type === 'MONTHLY')
            endDate = new Date(
              moment(startDate).add('1', 'month').toLocaleString()
            );
          else if (type === 'YEARLY')
            endDate = new Date(
              moment(startDate).add('1', 'year').toLocaleString()
            );
          else if (type === 'LIFETIME')
            endDate = new Date(
              moment(startDate).add('999', 'year').toLocaleString()
            );
          else if (type === 'EARLYADOPTER')
            endDate = new Date(
              moment(startDate).add('2', 'months').toLocaleString()
            );
          else endDate = null;

          if (endDate === null) throw new Error('End date is null.');

          const searchSubscription = await prisma.subscription.findFirst({
            where: { userId: user.id },
          });

          let response: Subscription;

          if (searchSubscription) {
            response = await prisma.subscription.update({
              where: { id: searchSubscription.id },
              data: { startDate, endDate, type },
            });
          } else {
            response = await prisma.subscription.create({
              data: {
                type,
                createdAt: new Date(),
                startDate,
                endDate,
                userId: user.id,
                extended: false,
              },
            });
          }

          return {
            id: response.id,
            type: response.type,
            createdAt: response.createdAt,
            startDate: response.startDate,
            endDate: response.endDate,
            userId: response.userId,
            user,
          };
        } catch (e) {
          throw e;
        }
      },
    });
  },
});

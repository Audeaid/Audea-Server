import { extendType, nonNull, arg } from 'nexus';
import moment from 'moment';
import { Subscription } from '@prisma/client';

export const purchasedSubscription = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('purchasedSubscription', {
      type: 'UserSubscription',

      args: {
        type: nonNull(
          arg({
            type: 'SubscriptionTypeEnum',
          })
        ),
      },

      async resolve(
        __,
        { type },
        { prisma, clerkUserId, notionInternal },
        ___
      ) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          const subscription = await prisma.subscription.findFirstOrThrow({
            where: { userId: user.id },
          });

          const now = new Date();
          const momentNow = moment(now);

          const endDateDb = subscription.endDate;
          const endDateMoment = moment(endDateDb);

          let addDays: number;

          if (type === 'MONTHLY') {
            addDays = 30;
          } else if (type === 'YEARLY') {
            addDays = 365;
          } else if (type === 'LIFETIME60') {
            addDays = 365250; // 1000 years
          } else {
            throw new Error('Invalid SubscriptionTypeEnum for this mutation.');
          }

          let response: Subscription;

          if (momentNow.isSameOrAfter(endDateMoment)) {
            /**
             * This means that current date is after (or the same) from the end date
             * Meaning that the subscription already ended
             * That means we have to update the startDate property
             * Notice the endDate is `addDays` from `momentNow`
             */
            response = await prisma.subscription.update({
              where: { id: subscription.id },
              data: {
                startDate: now,
                endDate: new Date(momentNow.add(addDays, 'days').toISOString()),
                type,
              },
            });
          } else {
            /**
             * This means that the subscription has not yet ended
             * Which also means that we don't need to update the startDate property
             * Notice the endDate is `addDays` from `endDateMoment`
             * That means we are adding whatever days to the current subscription
             */
            response = await prisma.subscription.update({
              where: { id: subscription.id },
              data: {
                endDate: new Date(
                  endDateMoment.add(addDays, 'days').toISOString()
                ),
                type,
              },
            });
          }

          if (user.notionPageId) {
            await notionInternal.pages.update({
              page_id: user.notionPageId,
              properties: {
                Subscription: {
                  select: {
                    name: 'YES',
                  },
                },
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

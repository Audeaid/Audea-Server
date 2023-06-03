import { arg, extendType, nonNull } from 'nexus';
import { subscriptionStr } from '../subscriptionStr';
import { DarkModePreferences } from '@prisma/client';

interface IPayloadContent {
  content: DarkModePreferences;
}

export const darkModeSubscription = extendType({
  type: 'Subscription',
  definition(t) {
    t.field('darkModeSubscription', {
      type: 'DarkMode',

      description: 'Subscription for darkMode',

      args: {
        clerkUserId: nonNull(
          arg({
            type: 'String',
          })
        ),
      },

      subscribe: async (__, { clerkUserId }, { pubsub }, ___) => {
        return pubsub.asyncIterator(subscriptionStr(clerkUserId));
      },

      resolve: async (payload: IPayloadContent, __, ____, ___) => {
        const { content } = payload;

        return {
          id: content.id,
          darkMode: content.darkMode,
          userId: content.userId,
        };
      },
    });
  },
});

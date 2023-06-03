import { Content } from '@prisma/client';
import { arg, extendType, nonNull } from 'nexus';
import { subscriptionStr } from '../subscriptionStr';

interface IPayloadContent {
  mutationType: 'ADD' | 'EDIT' | 'DELETE';
  content: Content;
}

export const contentSubscription = extendType({
  type: 'Subscription',
  definition(t) {
    t.field('contentSubscription', {
      type: 'ContentSubscriptionType',

      description: 'Subscription for content',

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
        const { content, mutationType } = payload;

        return {
          mutationType,
          content,
        };
      },
    });
  },
});

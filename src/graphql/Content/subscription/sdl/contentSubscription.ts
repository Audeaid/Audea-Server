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
        userId: nonNull(
          arg({
            type: 'String',
          })
        ),
      },

      subscribe: async (__, { userId }, { pubsub }, ___) => {
        return pubsub.asyncIterator(subscriptionStr(userId));
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

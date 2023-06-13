import { extendType } from 'nexus';
import {
  ISubscriptionVotePayload,
  androidVoteSubscriptionStr,
} from '../subscriptionStr';

export const androidVoteSubscription = extendType({
  type: 'Subscription',
  definition(t) {
    t.field('androidVoteSubscription', {
      type: 'PlatformVoteSubscription',

      subscribe: async (__, ____, { pubsub }, ___) => {
        return pubsub.asyncIterator(androidVoteSubscriptionStr());
      },

      resolve: async (payload: ISubscriptionVotePayload, __, ____, ___) => {
        const { vote } = payload;

        return {
          platform: 'ANDROID' as
            | 'ANDROID'
            | 'ANDROIDTABLET'
            | 'IOS'
            | 'IPADOS'
            | 'LINUX'
            | 'MACOS'
            | 'WINDOWS',
          vote,
        };
      },
    });
  },
});

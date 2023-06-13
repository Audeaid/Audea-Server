import { extendType } from 'nexus';
import {
  ISubscriptionVotePayload,
  iPadOSSubscriptionStr,
} from '../subscriptionStr';

export const iPadOSVoteSubscription = extendType({
  type: 'Subscription',
  definition(t) {
    t.field('iPadOSVoteSubscription', {
      type: 'PlatformVoteSubscription',

      subscribe: async (__, ____, { pubsub }, ___) => {
        return pubsub.asyncIterator(iPadOSSubscriptionStr());
      },

      resolve: async (payload: ISubscriptionVotePayload, __, ____, ___) => {
        const { vote } = payload;

        return {
          platform: 'IPADOS' as
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

import { extendType } from 'nexus';
import {
  ISubscriptionVotePayload,
  iOSVoteSubscriptionStr,
} from '../subscriptionStr';

export const iOSVoteSubscription = extendType({
  type: 'Subscription',
  definition(t) {
    t.field('iOSVoteSubscription', {
      type: 'PlatformVoteSubscription',

      subscribe: async (__, ____, { pubsub }, ___) => {
        return pubsub.asyncIterator(iOSVoteSubscriptionStr());
      },

      resolve: async (payload: ISubscriptionVotePayload, __, ____, ___) => {
        const { vote } = payload;

        return {
          platform: 'IOS' as
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

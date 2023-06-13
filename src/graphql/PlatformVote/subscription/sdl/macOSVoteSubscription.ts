import { extendType } from 'nexus';
import {
  ISubscriptionVotePayload,
  macOSVoteSubscriptionStr,
} from '../subscriptionStr';

export const macOSVoteSubscription = extendType({
  type: 'Subscription',
  definition(t) {
    t.field('macOSVoteSubscription', {
      type: 'PlatformVoteSubscription',

      subscribe: async (__, ____, { pubsub }, ___) => {
        return pubsub.asyncIterator(macOSVoteSubscriptionStr());
      },

      resolve: async (payload: ISubscriptionVotePayload, __, ____, ___) => {
        const { vote } = payload;

        return {
          platform: 'MACOS' as
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

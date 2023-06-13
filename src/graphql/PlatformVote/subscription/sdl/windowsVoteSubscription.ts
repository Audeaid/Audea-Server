import { extendType } from 'nexus';
import {
  ISubscriptionVotePayload,
  windowsVoteSubscriptionStr,
} from '../subscriptionStr';

export const windowsVoteSubscription = extendType({
  type: 'Subscription',
  definition(t) {
    t.field('windowsVoteSubscription', {
      type: 'PlatformVoteSubscription',

      subscribe: async (__, ____, { pubsub }, ___) => {
        return pubsub.asyncIterator(windowsVoteSubscriptionStr());
      },

      resolve: async (payload: ISubscriptionVotePayload, __, ____, ___) => {
        const { vote } = payload;

        return {
          platform: 'WINDOWS' as
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

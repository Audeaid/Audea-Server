import { extendType } from 'nexus';
import {
  ISubscriptionVotePayload,
  androidTabletVoteSubscriptionStr,
} from '../subscriptionStr';

export const androidTabletVoteSubscription = extendType({
  type: 'Subscription',
  definition(t) {
    t.field('androidTabletVoteSubscription', {
      type: 'PlatformVoteSubscription',

      subscribe: async (__, ____, { pubsub }, ___) => {
        return pubsub.asyncIterator(androidTabletVoteSubscriptionStr());
      },

      resolve: async (payload: ISubscriptionVotePayload, __, ____, ___) => {
        const { vote } = payload;

        return {
          platform: 'ANDROIDTABLET' as
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

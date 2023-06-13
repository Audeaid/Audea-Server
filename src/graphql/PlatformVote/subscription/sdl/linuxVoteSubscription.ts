import { extendType } from 'nexus';
import {
  ISubscriptionVotePayload,
  linuxVoteSubscriptionStr,
} from '../subscriptionStr';

export const linuxVoteSubscription = extendType({
  type: 'Subscription',
  definition(t) {
    t.field('linuxVoteSubscription', {
      type: 'PlatformVoteSubscription',

      subscribe: async (__, ____, { pubsub }, ___) => {
        return pubsub.asyncIterator(linuxVoteSubscriptionStr());
      },

      resolve: async (payload: ISubscriptionVotePayload, __, ____, ___) => {
        const { vote } = payload;

        return {
          platform: 'LINUX' as
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

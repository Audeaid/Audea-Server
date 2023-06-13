import { enumType, objectType } from 'nexus';

export const PlatformVote = objectType({
  name: 'PlatformVote',
  definition(t) {
    t.nonNull.field('platform', {
      type: 'PlatformVoteEnum',
    });
    t.nonNull.int('count');
  },
});

export const PlatformVoteUser = objectType({
  name: 'PlatformVoteUser',
  definition(t) {
    t.nonNull.field('platform', {
      type: 'PlatformVoteEnum',
    });
    t.nonNull.boolean('voted');
  },
});

export const PlatformVoteSubscription = objectType({
  name: 'PlatformVoteSubscription',
  definition(t) {
    t.nonNull.field('platform', {
      type: 'PlatformVoteEnum',
    });
    t.nonNull.boolean('vote');
  },
});

export const PlatformVoteEnum = enumType({
  name: 'PlatformVoteEnum',
  members: [
    'IOS',
    'IPADOS',
    'MACOS',
    'WINDOWS',
    'LINUX',
    'ANDROID',
    'ANDROIDTABLET',
  ],
});

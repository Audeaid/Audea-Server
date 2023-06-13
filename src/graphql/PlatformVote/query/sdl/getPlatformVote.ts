import { arg, extendType, nonNull } from 'nexus';

export const getPlatformVote = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getPlatformVote', {
      type: 'PlatformVote',

      args: {
        platform: nonNull(arg({ type: 'PlatformVoteEnum' })),
      },

      async resolve(__, { platform }, { prisma, clerkUserId }, ___) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          let response: number = 0;

          if (platform === 'ANDROID') {
            response = await prisma.androidVote.count();
          }

          if (platform === 'ANDROIDTABLET') {
            response = await prisma.androidTabletVote.count();
          }

          if (platform === 'IOS') {
            response = await prisma.iOSVote.count();
          }

          if (platform === 'IPADOS') {
            response = await prisma.iPadOSVote.count();
          }

          if (platform === 'MACOS') {
            response = await prisma.macOSVote.count();
          }

          if (platform === 'WINDOWS') {
            response = await prisma.windowsVote.count();
          }

          if (platform === 'LINUX') {
            response = await prisma.linuxVote.count();
          }

          return {
            platform,
            count: response,
          };
        } catch (e) {
          throw e;
        }
      },
    });
  },
});

import {
  AndroidTabletVote,
  AndroidVote,
  IOSVote,
  IPadOSVote,
  LinuxVote,
  MacOSVote,
  WindowsVote,
} from '@prisma/client';
import { arg, extendType, nonNull } from 'nexus';

export const checkIfAlreadyVotedPlatform = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('checkIfAlreadyVotedPlatform', {
      type: 'PlatformVoteUser',

      args: {
        platform: nonNull(arg({ type: 'PlatformVoteEnum' })),
      },

      async resolve(__, { platform }, { prisma, clerkUserId }, ___) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          let response:
            | AndroidVote
            | AndroidTabletVote
            | IOSVote
            | IPadOSVote
            | MacOSVote
            | WindowsVote
            | LinuxVote
            | null = null;

          if (platform === 'ANDROID') {
            response = await prisma.androidVote.findFirst({
              where: { userId: user.id },
            });
          }

          if (platform === 'ANDROIDTABLET') {
            response = await prisma.androidTabletVote.findFirst({
              where: { userId: user.id },
            });
          }

          if (platform === 'IOS') {
            response = await prisma.iOSVote.findFirst({
              where: { userId: user.id },
            });
          }

          if (platform === 'IPADOS') {
            response = await prisma.iPadOSVote.findFirst({
              where: { userId: user.id },
            });
          }

          if (platform === 'MACOS') {
            response = await prisma.macOSVote.findFirst({
              where: { userId: user.id },
            });
          }

          if (platform === 'WINDOWS') {
            response = await prisma.windowsVote.findFirst({
              where: { userId: user.id },
            });
          }

          if (platform === 'LINUX') {
            response = await prisma.linuxVote.findFirst({
              where: { userId: user.id },
            });
          }

          return {
            platform,
            voted: response ? true : false,
          };
        } catch (e) {
          throw e;
        }
      },
    });
  },
});

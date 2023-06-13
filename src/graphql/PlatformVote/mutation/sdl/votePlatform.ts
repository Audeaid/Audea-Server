import { arg, booleanArg, extendType, nonNull } from 'nexus';
import {
  androidTabletVoteSubscriptionStr,
  androidVoteSubscriptionStr,
  iOSVoteSubscriptionStr,
  iPadOSSubscriptionStr,
  linuxVoteSubscriptionStr,
  macOSVoteSubscriptionStr,
  windowsVoteSubscriptionStr,
} from '../../subscription/subscriptionStr';
import {
  AndroidTabletVote,
  AndroidVote,
  IOSVote,
  IPadOSVote,
  LinuxVote,
  MacOSVote,
  WindowsVote,
} from '@prisma/client';

export const votePlatform = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('votePlatform', {
      type: 'PlatformVote',

      args: {
        platform: nonNull(arg({ type: 'PlatformVoteEnum' })),
        vote: nonNull(booleanArg()),
      },

      async resolve(
        __,
        { platform, vote },
        { prisma, clerkUserId, pubsub },
        ___
      ) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          let response: number = 0;

          if (platform === 'ANDROID') {
            if (vote) {
              await prisma.androidVote.create({
                data: { userId: user.id, clerkUserId: user.clerkUserId },
              });

              await pubsub.publish(androidVoteSubscriptionStr(), {
                vote: true,
              });
            } else {
              await prisma.androidVote.delete({ where: { userId: user.id } });

              await pubsub.publish(androidVoteSubscriptionStr(), {
                vote: false,
              });
            }

            response = await prisma.androidVote.count();
          }

          if (platform === 'ANDROIDTABLET') {
            if (vote) {
              await prisma.androidTabletVote.create({
                data: { userId: user.id, clerkUserId: user.clerkUserId },
              });

              await pubsub.publish(androidTabletVoteSubscriptionStr(), {
                vote: true,
              });
            } else {
              await prisma.androidTabletVote.delete({
                where: { userId: user.id },
              });

              await pubsub.publish(androidTabletVoteSubscriptionStr(), {
                vote: false,
              });
            }

            response = await prisma.androidTabletVote.count();
          }

          if (platform === 'IOS') {
            if (vote) {
              await prisma.iOSVote.create({
                data: { userId: user.id, clerkUserId: user.clerkUserId },
              });

              await pubsub.publish(iOSVoteSubscriptionStr(), {
                vote: true,
              });
            } else {
              await prisma.iOSVote.delete({ where: { userId: user.id } });

              await pubsub.publish(iOSVoteSubscriptionStr(), {
                vote: false,
              });
            }

            response = await prisma.iOSVote.count();
          }

          if (platform === 'IPADOS') {
            if (vote) {
              await prisma.iPadOSVote.create({
                data: { userId: user.id, clerkUserId: user.clerkUserId },
              });

              await pubsub.publish(iPadOSSubscriptionStr(), {
                vote: true,
              });
            } else {
              await prisma.iPadOSVote.delete({ where: { userId: user.id } });

              await pubsub.publish(iPadOSSubscriptionStr(), {
                vote: false,
              });
            }

            response = await prisma.iPadOSVote.count();
          }

          if (platform === 'MACOS') {
            if (vote) {
              await prisma.macOSVote.create({
                data: { userId: user.id, clerkUserId: user.clerkUserId },
              });

              await pubsub.publish(macOSVoteSubscriptionStr(), {
                vote: true,
              });
            } else {
              await prisma.macOSVote.delete({ where: { userId: user.id } });

              await pubsub.publish(macOSVoteSubscriptionStr(), {
                vote: false,
              });
            }

            response = await prisma.macOSVote.count();
          }

          if (platform === 'WINDOWS') {
            if (vote) {
              await prisma.windowsVote.create({
                data: { userId: user.id, clerkUserId: user.clerkUserId },
              });

              await pubsub.publish(windowsVoteSubscriptionStr(), {
                vote: true,
              });
            } else {
              await prisma.windowsVote.delete({ where: { userId: user.id } });

              await pubsub.publish(windowsVoteSubscriptionStr(), {
                vote: false,
              });
            }

            response = await prisma.windowsVote.count();
          }

          if (platform === 'LINUX') {
            if (vote) {
              await prisma.linuxVote.create({
                data: { userId: user.id, clerkUserId: user.clerkUserId },
              });

              await pubsub.publish(linuxVoteSubscriptionStr(), {
                vote: true,
              });
            } else {
              await prisma.linuxVote.delete({ where: { userId: user.id } });

              await pubsub.publish(linuxVoteSubscriptionStr(), {
                vote: false,
              });
            }

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

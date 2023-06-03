import { booleanArg, extendType, nonNull } from 'nexus';
import { subscriptionStr } from '../../subscription/subscriptionStr';

export const updateDarkModePreferences = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updateDarkModePreferences', {
      type: 'DarkMode',

      args: {
        darkMode: nonNull(booleanArg()),
      },

      async resolve(__, { darkMode }, { prisma, clerkUserId, pubsub }, ___) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          const darkModePreferences = await prisma.darkModePreferences.update({
            where: { userId: user.id },
            data: { darkMode },
          });

          await pubsub.publish(subscriptionStr(user.clerkUserId), {
            content: darkModePreferences,
          });

          return {
            id: darkModePreferences.id,
            darkMode: darkModePreferences.darkMode,
            userId: user.id,
          };
        } catch (e) {
          throw e;
        }
      },
    });
  },
});

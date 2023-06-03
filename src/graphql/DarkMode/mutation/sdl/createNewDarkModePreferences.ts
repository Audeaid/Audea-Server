import { booleanArg, extendType } from 'nexus';

export const createNewDarkModePreferences = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createNewDarkModePreferences', {
      type: 'DarkMode',

      args: {
        darkMode: booleanArg(),
      },

      async resolve(__, { darkMode }, { prisma, clerkUserId }, ___) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          const darkModePreferences = await prisma.darkModePreferences.create({
            data: {
              userId: user.id,
              clerkUserId: user.clerkUserId,
              darkMode: darkMode ?? false,
            },
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

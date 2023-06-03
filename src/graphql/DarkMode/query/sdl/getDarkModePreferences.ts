import { nonNull, stringArg, extendType } from 'nexus';

export const getDarkModePreferences = extendType({
  type: 'Query',
  definition(t) {
    t.field('getDarkModePreferences', {
      type: 'DarkMode',

      async resolve(__, ____, { clerkUserId, prisma }, ___) {
        try {
          if (!clerkUserId) throw new Error('Invalid token');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          const darkModePreferences =
            await prisma.darkModePreferences.findFirst({
              where: { userId: user.id },
            });

          if (darkModePreferences) {
            return {
              id: darkModePreferences.id,
              darkMode: darkModePreferences.darkMode,
              userId: user.id,
            };
          } else {
            return null;
          }
        } catch (error) {
          throw error;
        }
      },
    });
  },
});

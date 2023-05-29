import { extendType, nonNull, stringArg } from 'nexus';

export const getContentSettings = extendType({
  type: 'Query',
  definition(t) {
    t.field('getContentSettings', {
      type: 'ContentSettings',

      async resolve(__, ____, { prisma, userId }, ___) {
        try {
          if (!userId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { id: userId },
          });

          const userSettings = await prisma.contentSettings.findFirst({
            where: { userId: user.id },
          });

          if (userSettings) {
            const typeOfPrompt = await prisma.typeOfPrompt.findFirstOrThrow({
              where: { id: userSettings.typeOfPromptId },
            });

            return {
              id: userSettings.id,
              createdAt: userSettings.createdAt,
              lastUpdate: userSettings.lastUpdate,
              user,
              userId: user.id,
              writingStyle: userSettings.writingStyle,
              outputLanguage: userSettings.outputLanguage,
              typeOfPrompt,
              typeOfPromptId: typeOfPrompt.id,
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

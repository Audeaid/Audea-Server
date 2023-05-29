import { extendType } from 'nexus';

export const createNewContentSettings = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createNewContentSettings', {
      type: 'ContentSettings',

      async resolve(__, ____, { prisma, userId }, ___) {
        try {
          if (!userId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { id: userId },
          });

          const contentSettings = await prisma.contentSettings.create({
            data: {
              createdAt: new Date(),
              lastUpdate: new Date(),
              userId: user.id,
              writingStyle: 'ASK',
              outputLanguage: 'ASK',
              typeOfPromptId: '647391c118e8a4e1170d3ec9',
            },
          });

          const typeOfPrompt = await prisma.typeOfPrompt.findFirstOrThrow({
            where: { id: contentSettings.typeOfPromptId },
          });

          return {
            id: contentSettings.id,
            createdAt: contentSettings.createdAt,
            lastUpdate: contentSettings.lastUpdate,
            user,
            userId: user.id,
            writingStyle: contentSettings.writingStyle,
            outputLanguage: contentSettings.outputLanguage,
            typeOfPrompt,
            typeOfPromptId: typeOfPrompt.id,
          };
        } catch (e) {
          throw e;
        }
      },
    });
  },
});

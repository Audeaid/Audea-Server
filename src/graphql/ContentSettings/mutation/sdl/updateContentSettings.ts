import { arg, extendType, stringArg } from 'nexus';

export const updateContentSettings = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updateContentSettings', {
      type: 'ContentSettings',

      args: {
        writingStyle: stringArg(),
        outputLanguage: arg({ type: 'OutputLanguageEnum' }),
        typeOfPromptId: stringArg(),
      },

      async resolve(
        __,
        { writingStyle, outputLanguage, typeOfPromptId },
        { prisma, userId },
        ___
      ) {
        try {
          if (!userId) throw new Error('Invalid token.');

          if (!writingStyle && !outputLanguage && !typeOfPromptId)
            throw new Error('Cannot have all value null!');

          const user = await prisma.user.findFirstOrThrow({
            where: { id: userId },
          });

          const contentSettings = await prisma.contentSettings.findFirstOrThrow(
            { where: { userId: user.id } }
          );

          if (typeOfPromptId) {
            await prisma.typeOfPrompt.findFirstOrThrow({
              where: { id: typeOfPromptId },
            });
          }

          const response = await prisma.contentSettings.update({
            where: {
              userId: user.id,
            },
            data: {
              lastUpdate: new Date(),
              writingStyle: writingStyle ?? contentSettings.writingStyle,
              outputLanguage: outputLanguage ?? contentSettings.outputLanguage,
              typeOfPromptId: typeOfPromptId ?? contentSettings.typeOfPromptId,
            },
          });

          const typeOfPrompt = await prisma.typeOfPrompt.findFirstOrThrow({
            where: { id: response.typeOfPromptId },
          });

          return {
            id: response.id,
            createdAt: response.createdAt,
            lastUpdate: response.lastUpdate,
            user,
            userId: user.id,
            writingStyle: response.writingStyle,
            outputLanguage: response.outputLanguage,
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

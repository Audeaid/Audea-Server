import { nonNull, stringArg, extendType } from 'nexus';

export const getTypeOfPromptFromId = extendType({
  type: 'Query',
  definition(t) {
    t.field('getTypeOfPromptFromId', {
      type: 'TypeOfPrompt',
      args: {
        typeOfPromptId: nonNull(stringArg()),
      },

      async resolve(__, { typeOfPromptId }, { prisma, userId }, ___) {
        try {
          if (!userId) throw new Error('Invalid token.');

          await prisma.user.findFirstOrThrow({
            where: { id: userId },
          });

          const typeOfPrompt = await prisma.typeOfPrompt.findFirst({
            where: { id: typeOfPromptId },
          });

          if (typeOfPrompt) {
            return {
              id: typeOfPrompt.id,
              displayName: typeOfPrompt.displayName,
              systemPrompt: typeOfPrompt.systemPrompt,
              createdAt: typeOfPrompt.createdAt,
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

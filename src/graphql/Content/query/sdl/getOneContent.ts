import { extendType, nonNull, stringArg } from 'nexus';

export const getOneContent = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getOneContent', {
      type: 'Content',

      args: {
        contentId: nonNull(stringArg()),
      },

      async resolve(__, { contentId }, { userId, prisma }, ___) {
        try {
          if (!userId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { id: userId },
          });

          const content = await prisma.content.findFirstOrThrow({
            where: { AND: [{ userId: user.id }, { id: contentId }] },
          });

          return {
            id: content.id,
            createdAt: content.createdAt,
            title: content.title,
            voiceNoteUrl: content.voiceNoteUrl,
            transcript: content.transcript,
            gptGenerated: content.gptGenerated,
            typeOfPromptId: content.typeOfPromptId,
            userId: user.id,
          };
        } catch (error) {
          throw error;
        }
      },
    });
  },
});

import { extendType, nonNull, stringArg } from 'nexus';

export const getOneContent = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getOneContent', {
      type: 'Content',

      args: {
        contentId: nonNull(stringArg()),
      },

      async resolve(__, { contentId }, { clerkUserId, prisma }, ___) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
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
            writingStyle: content.writingStyle,
            outputLanguage: content.outputLanguage,
          };
        } catch (error) {
          throw error;
        }
      },
    });
  },
});

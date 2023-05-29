import { extendType } from 'nexus';

export const getAllContent = extendType({
  type: 'Query',
  definition(t) {
    t.list.nonNull.field('getAllContent', {
      type: 'Content',

      async resolve(__, ____, { userId, prisma }, ___) {
        try {
          if (!userId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { id: userId },
          });

          const content = await prisma.content.findMany({
            where: { userId: user.id },
            orderBy: [{ createdAt: 'desc' }],
          });

          if (content.length === 0) {
            return null;
          } else {
            return content.map((val) => {
              return {
                id: val.id,
                createdAt: val.createdAt,
                title: val.title,
                voiceNoteUrl: val.voiceNoteUrl,
                transcript: val.transcript,
                gptGenerated: val.gptGenerated,
                typeOfPromptId: val.typeOfPromptId,
                userId: user.id,
                writingStyle: val.writingStyle,
                outputLanguage: val.outputLanguage,
              };
            });
          }
        } catch (error) {
          throw error;
        }
      },
    });
  },
});

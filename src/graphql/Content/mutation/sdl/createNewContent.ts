import { extendType } from 'nexus';

export const createNewContent = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createNewContent', {
      type: 'Content',

      async resolve(__, ____, { prisma, userId }, ___) {
        try {
          if (!userId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { id: userId },
          });

          const content = await prisma.content.create({
            data: {
              createdAt: new Date(),
              userId: user.id,
            },
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
        } catch (e) {
          throw e;
        }
      },
    });
  },
});

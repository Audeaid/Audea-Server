import { extendType, nonNull } from 'nexus';
import { stringArg } from 'nexus';

export const updateContent = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updateContent', {
      type: 'Content',
      args: {
        contentId: nonNull(stringArg()),
        title: stringArg(),
        voiceNoteUrl: stringArg(),
        transcript: stringArg(),
        gptGenerated: stringArg(),
        typeOfPromptId: stringArg(),
      },

      async resolve(
        __,
        {
          contentId,
          title,
          voiceNoteUrl,
          transcript,
          gptGenerated,
          typeOfPromptId,
        },
        { prisma, userId },
        ___
      ) {
        try {
          if (!userId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { id: userId },
          });

          const content = await prisma.content.findFirstOrThrow({
            where: { AND: [{ id: contentId }, { userId: user.id }] },
          });

          const response = await prisma.content.update({
            where: { id: content.id },
            data: {
              title: title ?? content.title,
              voiceNoteUrl: voiceNoteUrl ?? content.voiceNoteUrl,
              transcript: transcript ?? content.transcript,
              gptGenerated: gptGenerated ?? content.gptGenerated,
              typeOfPromptId: typeOfPromptId ?? content.typeOfPromptId,
            },
          });

          return {
            id: response.id,
            createdAt: response.createdAt,
            title: response.title,
            voiceNoteUrl: response.voiceNoteUrl,
            transcript: response.transcript,
            gptGenerated: response.gptGenerated,
            typeOfPromptId: response.typeOfPromptId,
            userId: user.id,
          };
        } catch (e) {
          throw e;
        }
      },
    });
  },
});

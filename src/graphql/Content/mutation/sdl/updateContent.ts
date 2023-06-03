import { arg, extendType, nonNull } from 'nexus';
import { stringArg } from 'nexus';
import { subscriptionStr } from '../../subscription/subscriptionStr';

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
        writingStyle: stringArg(),
        outputLanguage: arg({ type: 'OutputLanguageEnum' }),
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
          writingStyle,
          outputLanguage,
        },
        { prisma, clerkUserId, pubsub },
        ___
      ) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          if (
            !title &&
            !voiceNoteUrl &&
            !transcript &&
            !gptGenerated &&
            !typeOfPromptId &&
            !writingStyle &&
            !outputLanguage
          )
            throw new Error('Cannot have all value null!');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
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
              writingStyle: writingStyle ?? content.writingStyle,
              outputLanguage: outputLanguage ?? content.outputLanguage,
            },
          });

          await pubsub.publish(subscriptionStr(user.clerkUserId), {
            mutationType: 'EDIT',
            content: response,
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
            writingStyle: response.writingStyle,
            outputLanguage: response.outputLanguage,
          };
        } catch (e) {
          throw e;
        }
      },
    });
  },
});

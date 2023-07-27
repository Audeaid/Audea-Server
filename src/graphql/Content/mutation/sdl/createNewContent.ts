import { extendType } from 'nexus';
import { subscriptionStr } from '../../subscription/subscriptionStr';

export const createNewContent = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createNewContent', {
      type: 'Content',

      async resolve(__, ____, { prisma, clerkUserId, pubsub }, ___) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          const content = await prisma.content.create({
            data: {
              createdAt: new Date(),
              userId: user.id,
            },
          });

          await pubsub.publish(subscriptionStr(user.clerkUserId), {
            mutationType: 'ADD',
            content: content,
          });

          return {
            id: content.id,
            createdAt: content.createdAt,
            title: content.title,
            s3ObjectName: content.s3ObjectName,
            transcript: content.transcript,
            gptGenerated: content.gptGenerated,
            typeOfPromptId: content.typeOfPromptId,
            userId: user.id,
            writingStyle: content.writingStyle,
            outputLanguage: content.outputLanguage,
          };
        } catch (e) {
          throw e;
        }
      },
    });
  },
});

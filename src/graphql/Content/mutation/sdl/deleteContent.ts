import { extendType, nonNull, stringArg } from 'nexus';
import { subscriptionStr } from '../../subscription/subscriptionStr';

export const deleteContent = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('deleteContent', {
      type: 'ResponseMessage',

      args: {
        contentId: nonNull(stringArg()),
      },

      async resolve(__, { contentId }, { prisma, userId, pubsub, s3 }, ___) {
        try {
          if (!userId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { id: userId },
          });

          const content = await prisma.content.findFirstOrThrow({
            where: { id: contentId },
          });

          if (content.voiceNoteUrl) {
            await s3
              .deleteObject({
                Bucket: 'audea-voice-note',
                Key: content.voiceNoteUrl.split('/').pop() as string,
              })
              .promise();
          }

          await pubsub.publish(subscriptionStr(user.id), {
            mutationType: 'DELETE',
            content: content,
          });

          await prisma.content.delete({ where: { id: content.id } });

          return {
            response: 'Successfully delete content',
          };
        } catch (e) {
          throw e;
        }
      },
    });
  },
});

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

      async resolve(
        __,
        { contentId },
        { prisma, clerkUserId, pubsub, s3 },
        ___
      ) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          const content = await prisma.content.findFirstOrThrow({
            where: { id: contentId },
          });

          const notionPage = await prisma.generatedNotionPage.findFirst({
            where: { contentId: content.id },
          });

          if (notionPage) {
            await prisma.generatedNotionPage.delete({
              where: { id: notionPage.id },
            });
          }

          if (content.s3ObjectName) {
            await s3
              .deleteObject({
                Bucket: 'audea-us',
                Key: content.s3ObjectName,
              })
              .promise();
          }

          await pubsub.publish(subscriptionStr(user.clerkUserId), {
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

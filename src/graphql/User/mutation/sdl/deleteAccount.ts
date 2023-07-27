import { extendType } from 'nexus';

export const deleteAccount = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('deleteAccount', {
      type: 'ResponseMessage',

      async resolve(
        __,
        ____,
        { prisma, notionInternal, clerkUserId, s3 },
        ___
      ) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          const content = await prisma.content.findMany({
            where: { userId: user.id },
          });

          const s3objectsToDelete: { Key: string }[] = content
            .map((val) => val.s3ObjectName)
            .filter(
              (s3ObjectName): s3ObjectName is string =>
                s3ObjectName !== null && s3ObjectName !== undefined
            )
            .map((s3ObjectName) => ({ Key: s3ObjectName as string }));

          if (s3objectsToDelete.length > 0) {
            await s3
              .deleteObjects({
                Bucket: 'audea-us',
                Delete: { Objects: s3objectsToDelete },
              })
              .promise();
          }

          await prisma.content.deleteMany({ where: { userId: user.id } });

          await prisma.deletedAccount.create({ data: { email: user.email } });

          content.forEach(async (val) => {
            await prisma.generatedNotionPage.delete({
              where: { contentId: val.id },
            });
          });

          await prisma.notionAccount.delete({ where: { userId: user.id } });

          await prisma.subscription.delete({ where: { userId: user.id } });

          await prisma.contentSettings.delete({ where: { userId: user.id } });

          if (user.notionPageId !== null) {
            await notionInternal.pages.update({
              page_id: user.notionPageId,
              archived: true,
            });
          }

          await prisma.user.delete({ where: { id: user.id } });

          return {
            response:
              'Successfully delete all the data associated with that userId',
          };
        } catch (e) {
          throw e;
        }
      },
    });
  },
});

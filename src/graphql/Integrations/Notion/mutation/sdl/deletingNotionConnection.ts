import { extendType } from 'nexus';

export const deletingNotionConnection = extendType({
  type: 'Mutation',

  definition(t) {
    t.nonNull.field('deletingNotionConnection', {
      type: 'ResponseMessage',

      async resolve(__, ____, { prisma, clerkUserId }, ___) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          const notionAccount = await prisma.notionAccount.findFirstOrThrow({
            where: { userId: user.id },
          });

          await prisma.notionAccount.delete({
            where: { id: notionAccount.id },
          });

          await prisma.generatedNotionPage.deleteMany({
            where: { notionAccountId: notionAccount.id },
          });

          return { response: 'Successfully delete notion account' };
        } catch (e) {
          throw e;
        }
      },
    });
  },
});

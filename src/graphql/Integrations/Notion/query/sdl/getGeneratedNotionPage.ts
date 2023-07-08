import { extendType, nonNull, stringArg } from 'nexus';

export const getGeneratedNotionPage = extendType({
  type: 'Query',
  definition(t) {
    t.field('getGeneratedNotionPage', {
      type: 'GeneratedNotionPage',

      args: {
        contentId: nonNull(stringArg()),
      },

      async resolve(__, { contentId }, { prisma, clerkUserId }, ___) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          const content = await prisma.content.findFirstOrThrow({
            where: { AND: [{ id: contentId }, { userId: user.id }] },
          });

          const generatedNotionPage =
            await prisma.generatedNotionPage.findFirst({
              where: { contentId: content.id },
            });

          return generatedNotionPage ?? null;
        } catch (error) {
          throw error;
        }
      },
    });
  },
});

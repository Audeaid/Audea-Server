import { extendType, nonNull, stringArg } from 'nexus';

export const getSharedContentByContentId = extendType({
  type: 'Query',
  definition(t) {
    t.field('getSharedContentByContentId', {
      type: 'SharedContent',

      args: {
        contentId: nonNull(stringArg()),
      },

      async resolve(__, { contentId }, { prisma, clerkUserId }, ___) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          const sharedContent = await prisma.sharedContent.findFirst({
            where: { AND: [{ contentId }, { userId: user.id }] },
          });

          return sharedContent ?? null;
        } catch (error) {
          throw error;
        }
      },
    });
  },
});

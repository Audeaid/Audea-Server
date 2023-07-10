import { extendType, nonNull, stringArg } from 'nexus';

export const deleteSharedContent = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('deleteSharedContent', {
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

          const sharedContent = await prisma.sharedContent.findFirstOrThrow({
            where: { AND: [{ contentId }, { userId: user.id }] },
          });

          const response = await prisma.sharedContent.delete({
            where: { id: sharedContent.id },
          });

          return response;
        } catch (e) {
          throw e;
        }
      },
    });
  },
});

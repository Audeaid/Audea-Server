import { extendType, nonNull, stringArg } from 'nexus';

export const getSharedContent = extendType({
  type: 'Query',
  definition(t) {
    t.field('getSharedContent', {
      type: 'SharedContent',

      args: {
        generatedId: nonNull(stringArg()),
        username: nonNull(stringArg()),
      },

      async resolve(__, { generatedId, username }, { prisma }, ___) {
        try {
          const sharedContent = await prisma.sharedContent.findFirst({
            where: { AND: [{ username }, { generatedId }] },
          });

          return sharedContent ?? null;
        } catch (error) {
          throw error;
        }
      },
    });
  },
});

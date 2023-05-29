import { nonNull, stringArg, extendType } from 'nexus';

export const getAllTypeOfPrompt = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('getAllTypeOfPrompt', {
      type: 'TypeOfPrompt',

      async resolve(__, ____, { prisma, userId }, ___) {
        try {
          if (!userId) throw new Error('Invalid token.');

          await prisma.user.findFirstOrThrow({
            where: { id: userId },
          });

          const typeOfPrompt = await prisma.typeOfPrompt.findMany({
            where: { NOT: [{ id: '647391c118e8a4e1170d3ec9' }] },
          });

          return typeOfPrompt;
        } catch (error) {
          throw error;
        }
      },
    });
  },
});

import { extendType, stringArg, nonNull, booleanArg } from 'nexus';

export const setNotionPrimaryDatabase = extendType({
  type: 'Mutation',

  definition(t) {
    t.nonNull.field('setNotionPrimaryDatabase', {
      type: 'ResponseMessage',

      args: {
        id: nonNull(stringArg()),
        automatic: booleanArg(),
      },

      async resolve(__, { id, automatic }, { prisma, clerkUserId }, ___) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          await prisma.notionAccount.update({
            where: { userId: user.id },
            data: { primaryDatabase: id, automaticPost: automatic ?? false },
          });

          return { response: 'Successfully set primary database' };
        } catch (e) {
          throw e;
        }
      },
    });
  },
});

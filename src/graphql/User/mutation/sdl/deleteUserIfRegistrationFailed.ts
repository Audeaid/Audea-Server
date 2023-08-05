import { extendType, nonNull, stringArg } from 'nexus';

export const deleteUserIfRegistrationFailed = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('deleteUserIfRegistrationFailed', {
      type: 'ResponseMessage',

      args: {
        id: nonNull(stringArg()),
        secret: nonNull(stringArg()),
      },

      async resolve(__, { id, secret }, { prisma }, ___) {
        try {
          if (secret !== process.env.DELETE_USER_SECRET)
            throw new Error('Wrong secret!');

          const subscription = await prisma.subscription.findFirst({
            where: { userId: id },
          });

          if (subscription) {
            await prisma.subscription.delete({ where: { userId: id } });
          }

          const contentSettings = await prisma.contentSettings.findFirst({
            where: { userId: id },
          });

          if (contentSettings) {
            await prisma.contentSettings.delete({ where: { userId: id } });
          }

          const user = await prisma.user.findFirst({
            where: { id },
          });

          if (user) {
            await prisma.user.delete({ where: { id } });
          }

          return { response: 'Success' };
        } catch (e) {
          throw e;
        }
      },
    });
  },
});

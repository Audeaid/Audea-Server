import { extendType, nonNull, stringArg } from 'nexus';

export const getPaidObject = extendType({
  type: 'Query',
  definition(t) {
    t.field('getPaidObject', {
      type: 'StripePaidObject',

      args: {
        sessionId: nonNull(stringArg()),
      },

      async resolve(__, { sessionId }, { prisma, clerkUserId }, ___) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          const stripeCustomer = await prisma.stripeCustomer.findFirstOrThrow({
            where: { userId: user.id },
          });

          const response = await prisma.stripePaidObject.findFirst({
            where: {
              AND: [{ stripeCustomerDbId: stripeCustomer.id }, { sessionId }],
            },
          });

          return response;
        } catch (e) {
          throw e;
        }
      },
    });
  },
});

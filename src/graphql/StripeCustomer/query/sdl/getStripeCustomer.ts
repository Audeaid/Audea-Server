import { extendType } from 'nexus';

export const getStripeCustomer = extendType({
  type: 'Query',
  definition(t) {
    t.field('getStripeCustomer', {
      type: 'StripeCustomer',

      async resolve(__, ____, { prisma, clerkUserId }, ___) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          const response = await prisma.stripeCustomer.findFirst({
            where: { userId: user.id },
          });

          return response;
        } catch (e) {
          throw e;
        }
      },
    });
  },
});

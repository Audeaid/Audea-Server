import { extendType } from 'nexus';

export const createStripeCustomer = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createStripeCustomer', {
      type: 'StripeCustomer',

      async resolve(__, ____, { prisma, clerkUserId, stripe }, ___) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          const stripeData = await stripe.customers.create({
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
          });

          const response = await prisma.stripeCustomer.create({
            data: {
              email: user.email,
              name: `${user.firstName} ${user.lastName}`,
              stripeCustomerId: stripeData.id,
              clerkUserId: user.clerkUserId,
              userId: user.id,
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

type Block = {
  object: 'block';
  paragraph: {
    rich_text: {
      text: {
        content: string;
      };
    }[];
  };
};

function transformStringToBlocks(text: string): Block[] {
  const paragraphs = text.split('\n\n');

  const blocks: Block[] = paragraphs.map((paragraph) => ({
    object: 'block',
    paragraph: {
      rich_text: [
        {
          text: {
            content: paragraph.trim(),
          },
        },
      ],
    },
  }));

  return blocks;
}

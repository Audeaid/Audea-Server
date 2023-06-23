import { extendType, nonNull, stringArg } from 'nexus';

export const createPaidObject = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createPaidObject', {
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

          const response = await prisma.stripePaidObject.create({
            data: {
              sessionId,
              clerkUserId: user.clerkUserId,
              stripeCustomerDbId: stripeCustomer.id,
              redeem: true,
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

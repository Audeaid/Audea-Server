import { Client } from '@notionhq/client';
import { extendType } from 'nexus';

export const getNotionAccount = extendType({
  type: 'Query',
  definition(t) {
    t.field('getNotionAccount', {
      type: 'NotionAccount',

      async resolve(__, ____, { prisma, clerkUserId }, ___) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          const notionAccount = await prisma.notionAccount.findFirst({
            where: { userId: user.id },
          });

          return notionAccount;
        } catch (error) {
          throw error;
        }
      },
    });
  },
});

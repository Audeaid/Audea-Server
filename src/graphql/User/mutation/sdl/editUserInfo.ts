import { extendType } from 'nexus';
import { stringArg } from 'nexus';

export const editUserInfo = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('editUserInfo', {
      type: 'User',
      args: {
        name: stringArg(),
      },

      async resolve(__, { name }, { prisma, notionInternal, userId }, ___) {
        try {
          if (!userId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { id: userId },
          });

          const response = await prisma.user.update({
            where: { id: user.id },
            data: { name: name ?? user.name },
          });

          const pageId = user.notionPageId;

          if (!pageId) throw new Error('notionPageId is null');

          await notionInternal.pages.update({
            page_id: pageId,
            properties: {
              Name: {
                title: [
                  {
                    text: {
                      content: name ?? user.name,
                    },
                  },
                ],
              },
            },
          });

          return { ...response };
        } catch (e) {
          throw e;
        }
      },
    });
  },
});

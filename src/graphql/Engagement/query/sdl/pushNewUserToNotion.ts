import { nonNull, stringArg, extendType } from 'nexus';

export const pushNewUserToNotion = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('pushNewUserToNotion', {
      type: 'ResponseMessage',
      args: {
        email: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },

      async resolve(__, { email, name }, { notionInternal, prisma }, ___) {
        try {
          const response = await notionInternal.pages.create({
            parent: {
              database_id: process.env.NOTION_AUDEANS_DATABASE_ID as string,
            },
            properties: {
              Name: {
                title: [
                  {
                    text: {
                      content: name,
                    },
                  },
                ],
              },
              Email: {
                email: email,
              },
              Subscription: {
                select: {
                  name: 'NO',
                },
              },
            },
          });

          await prisma.user.update({
            where: { email },
            data: { notionPageId: response.id },
          });

          return { response: JSON.stringify(response) };
        } catch (error) {
          throw error;
        }
      },
    });
  },
});

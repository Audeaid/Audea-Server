import { extendType, nonNull, stringArg } from 'nexus';

export const dreamWorkflowForm = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('dreamWorkflowForm', {
      type: 'ResponseMessage',

      args: {
        longText: nonNull(stringArg()),
      },

      async resolve(
        __,
        { longText },
        { prisma, clerkUserId, notionInternal },
        ___
      ) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          if (!user.notionPageId) throw new Error('notionPageId is null.');

          const DATABASE_ID = 'bcb3ef7e83f54dd68019e82768f6abc0';

          const response = await notionInternal.pages.create({
            parent: {
              database_id: DATABASE_ID,
            },
            properties: {
              Name: {
                title: [
                  {
                    text: {
                      content: `Dream workflow by ${user.firstName}`,
                    },
                  },
                ],
              },

              Audeance: { relation: [{ id: user.notionPageId }] },
            },
            children: transformStringToBlocks(longText),
          });

          return {
            response: JSON.stringify('kotnol'),
          };
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

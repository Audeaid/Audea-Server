import { extendType, nonNull, stringArg } from 'nexus';

export const createUserFromClerk = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createUserFromClerk', {
      type: 'User',

      args: {
        email: nonNull(stringArg()),
        clerkId: nonNull(stringArg()),
        firstName: nonNull(stringArg()),
        lastName: nonNull(stringArg()),
      },

      async resolve(
        __,
        { email, clerkId, firstName, lastName },
        { prisma, notionInternal },
        ___
      ) {
        try {
          const searchUser = await prisma.user.findFirst({
            where: { email },
          });

          if (searchUser) throw new Error('User already exist!');

          const user = await prisma.user.create({
            data: {
              clerkUserId: clerkId,
              firstName,
              lastName,
              email,
              createdAt: new Date(),
            },
          });

          const notion = await notionInternal.pages.create({
            parent: {
              database_id: process.env.NOTION_AUDEANS_DATABASE_ID as string,
            },
            properties: {
              Name: {
                title: [
                  {
                    text: {
                      content: `${user.firstName} ${user.lastName}`,
                    },
                  },
                ],
              },
              Email: {
                email: user.email,
              },
              Subscription: {
                select: {
                  name: 'NO',
                },
              },
              'First Name': {
                rich_text: [
                  {
                    text: {
                      content: user.firstName,
                    },
                  },
                ],
              },
              'Last Name': {
                rich_text: [
                  {
                    text: {
                      content: user.lastName,
                    },
                  },
                ],
              },
            },
          });

          await prisma.user.update({
            where: { id: user.id },
            data: { notionPageId: notion.id },
          });

          return user;
        } catch (e) {
          throw e;
        }
      },
    });
  },
});

import { extendType, nonNull, stringArg } from 'nexus';
import jwt from 'jsonwebtoken';
import { AuthTokenPayload } from '../../../../utils/auth';

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
        referralJwt: stringArg(),
      },

      async resolve(
        __,
        { email, clerkId, firstName, lastName, referralJwt },
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

          let invitedNotionPageId: string | null = null;

          if (referralJwt) {
            const { clerkUserId: refClerkUserId } = jwt.verify(
              referralJwt,
              process.env.APP_SECRET as string
            ) as AuthTokenPayload;

            const refUser = await prisma.user.findFirst({
              where: { clerkUserId: refClerkUserId },
            });

            if (refUser) {
              await prisma.user.update({
                where: { id: user.id },
                data: { invitedByUserId: refUser.id },
              });

              invitedNotionPageId = refUser.notionPageId;
            }
          }

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

              ...(invitedNotionPageId
                ? {
                    'Invited By': {
                      relation: [
                        {
                          id: invitedNotionPageId,
                        },
                      ],
                    },
                  }
                : {}),
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

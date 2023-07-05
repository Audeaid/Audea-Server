import { extendType, stringArg, nonNull } from 'nexus';
import { bulletPointsWithSummary, summariseMyThoughts } from '../../utils';
import { Client } from '@notionhq/client';
import { GeneratedNotionPage } from '@prisma/client';

export const generateNotionPage = extendType({
  type: 'Mutation',

  definition(t) {
    t.nonNull.field('generateNotionPage', {
      type: 'GeneratedNotionPage',

      args: {
        contentId: nonNull(stringArg()),
        notionTitleName: nonNull(stringArg()),
      },

      async resolve(
        __,
        { contentId, notionTitleName },
        { prisma, clerkUserId },
        ___
      ) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          const content = await prisma.content.findFirstOrThrow({
            where: { AND: [{ userId: user.id }, { id: contentId }] },
          });

          const notionAccount = await prisma.notionAccount.findFirstOrThrow({
            where: { userId: user.id },
          });

          if (
            !content.title ||
            !content.gptGenerated ||
            !content.typeOfPromptId ||
            !notionAccount.primaryDatabase
          )
            throw new Error('Value needed is not present.');

          const notionClient = new Client({
            auth: notionAccount.accessToken,
          });

          let generatedNotionPage: GeneratedNotionPage;

          if (content.typeOfPromptId === '64a3da8642064a96db90e15e') {
            const obj = summariseMyThoughts(
              notionAccount.primaryDatabase,
              notionTitleName,
              content.title,
              content.gptGenerated
            );

            const response: any = await notionClient.pages.create(obj as any);

            generatedNotionPage = await prisma.generatedNotionPage.create({
              data: {
                notionPageId: response.id,
                url: response.url ?? '',
                contentId: content.id,
                notionAccountId: notionAccount.id,
              },
            });
          } else if (content.typeOfPromptId === '646a2fc687e737835670b7b3') {
            const obj = bulletPointsWithSummary(
              notionAccount.primaryDatabase,
              notionTitleName,
              content.title,
              content.gptGenerated
            );

            const response: any = await notionClient.pages.create(obj as any);

            generatedNotionPage = await prisma.generatedNotionPage.create({
              data: {
                notionPageId: response.id,
                url: response.url ?? '',
                contentId: content.id,
                notionAccountId: notionAccount.id,
              },
            });
          } else {
            throw new Error('Invalid typeOfPromptId');
          }

          return generatedNotionPage;
        } catch (e) {
          throw e;
        }
      },
    });
  },
});

import { arg, extendType, nonNull } from 'nexus';

export const userRequestIntegration = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('userRequestIntegration', {
      type: 'RequestedIntegration',

      args: {
        integration: nonNull(arg({ type: 'IntegrationsEnum' })),
      },

      async resolve(
        __,
        { integration },
        { prisma, clerkUserId, notionInternal },
        ___
      ) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          const pushToNotion = async (page_id: string) => {
            const response = (await notionInternal.pages.retrieve({
              page_id,
            })) as any;

            const existingRelation: { id: string }[] =
              response.properties.Audeance.relation;

            const relation = [
              ...existingRelation,
              { id: user.notionPageId ?? '' },
            ];

            await notionInternal.pages.update({
              page_id,
              properties: {
                Audeance: {
                  relation,
                },
              },
            });
          };

          const NOTION_PAGE_ID = '48f48bcc61504b4fb2caebb40c51568f';
          const TODOIST_PAGE_ID = '913724187acf47d7938b4bce1bc277c1';
          const WHATSAPP_PAGE_ID = '17a5c4b2e25646c1a74a90e408060709';
          const ZAPIER_PAGE_ID = '65c653c817f8496a851266c33f3ac5e7';
          const SUNSAMA_PAGE_ID = 'b056f57c9658499fb0a1159599938755';
          const OBSIDIAN_PAGE_ID = '9cba596c8803427b84379178d9b9f358';
          const MONDAY_PAGE_ID = '08d4caa281e44890a701baead70f6e31';
          const GMAIL_PAGE_ID = 'c9e10aacf9b346708091988bb4036cba';
          const GITHUB_PAGE_ID = '83c9a99a1354494d9eb53afe301872ae';
          const EVERNOTE_PAGE_ID = '2d15602d496b48a6bc67e6d92cd2eb22';
          const CRAFT_PAGE_ID = '9d3594780a9b4909902e9fd0cea101bf';
          const CLICKUP_PAGE_ID = '45ea333249f6406e91fcc1c0daf11b50';

          if (integration === 'CLICKUP') {
            await prisma.clickupIntegrationRequest.create({
              data: { userId: user.id, clerkUserId: user.clerkUserId },
            });

            await pushToNotion(CLICKUP_PAGE_ID);
          }

          if (integration === 'NOTION') {
            await prisma.notionIntegrationRequest.create({
              data: { userId: user.id, clerkUserId: user.clerkUserId },
            });

            await pushToNotion(NOTION_PAGE_ID);
          }

          if (integration === 'TODOIST') {
            await prisma.todoistIntegrationRequest.create({
              data: { userId: user.id, clerkUserId: user.clerkUserId },
            });

            await pushToNotion(TODOIST_PAGE_ID);
          }

          if (integration === 'WHATSAPP') {
            await prisma.whatsappIntegrationRequest.create({
              data: { userId: user.id, clerkUserId: user.clerkUserId },
            });

            await pushToNotion(WHATSAPP_PAGE_ID);
          }

          if (integration === 'ZAPIER') {
            await prisma.zapierIntegrationRequest.create({
              data: { userId: user.id, clerkUserId: user.clerkUserId },
            });

            await pushToNotion(ZAPIER_PAGE_ID);
          }

          if (integration === 'SUNSAMA') {
            await prisma.sunsamaIntegrationRequest.create({
              data: { userId: user.id, clerkUserId: user.clerkUserId },
            });

            await pushToNotion(SUNSAMA_PAGE_ID);
          }

          if (integration === 'OBSIDIAN') {
            await prisma.obsidianIntegrationRequest.create({
              data: { userId: user.id, clerkUserId: user.clerkUserId },
            });

            await pushToNotion(OBSIDIAN_PAGE_ID);
          }

          if (integration === 'MONDAY') {
            await prisma.mondayIntegrationRequest.create({
              data: { userId: user.id, clerkUserId: user.clerkUserId },
            });

            await pushToNotion(MONDAY_PAGE_ID);
          }

          if (integration === 'GMAIL') {
            await prisma.gmailIntegrationRequest.create({
              data: { userId: user.id, clerkUserId: user.clerkUserId },
            });

            await pushToNotion(GMAIL_PAGE_ID);
          }

          if (integration === 'GITHUB') {
            await prisma.githubIntegrationRequest.create({
              data: { userId: user.id, clerkUserId: user.clerkUserId },
            });

            await pushToNotion(GITHUB_PAGE_ID);
          }

          if (integration === 'EVERNOTE') {
            await prisma.evernoteIntegrationRequest.create({
              data: { userId: user.id, clerkUserId: user.clerkUserId },
            });

            await pushToNotion(EVERNOTE_PAGE_ID);
          }

          if (integration === 'CRAFT') {
            await prisma.craftIntegrationRequest.create({
              data: { userId: user.id, clerkUserId: user.clerkUserId },
            });

            await pushToNotion(CRAFT_PAGE_ID);
          }

          return {
            integration,
            requested: true,
          };
        } catch (e) {
          throw e;
        }
      },
    });
  },
});

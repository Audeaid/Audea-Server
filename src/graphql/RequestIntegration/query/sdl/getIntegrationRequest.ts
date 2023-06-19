import { arg, extendType, nonNull } from 'nexus';

export const getIntegrationRequest = extendType({
  type: 'Query',
  definition(t) {
    t.field('getIntegrationRequest', {
      type: 'RequestedIntegration',

      args: {
        integration: nonNull(arg({ type: 'IntegrationsEnum' })),
      },

      async resolve(__, { integration }, { prisma, clerkUserId }, ___) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          let integrationNew:
            | 'CLICKUP'
            | 'NOTION'
            | 'TODOIST'
            | 'WHATSAPP'
            | 'ZAPIER'
            | 'SUNSAMA'
            | 'OBSIDIAN'
            | 'MONDAY'
            | 'GMAIL'
            | 'GITHUB'
            | 'EVERNOTE'
            | 'CRAFT'
            | null = null;
          let requested: boolean | null = null;

          if (integration === 'CLICKUP') {
            const response = await prisma.clickupIntegrationRequest.findFirst({
              where: { userId: user.id },
            });

            if (response) {
              requested = true;
              integrationNew = integration;
            }
          }

          if (integration === 'NOTION') {
            const response = await prisma.notionIntegrationRequest.findFirst({
              where: { userId: user.id },
            });

            if (response) {
              requested = true;
              integrationNew = integration;
            }
          }

          if (integration === 'TODOIST') {
            const response = await prisma.todoistIntegrationRequest.findFirst({
              where: { userId: user.id },
            });

            if (response) {
              requested = true;
              integrationNew = integration;
            }
          }

          if (integration === 'WHATSAPP') {
            const response = await prisma.whatsappIntegrationRequest.findFirst({
              where: { userId: user.id },
            });

            if (response) {
              requested = true;
              integrationNew = integration;
            }
          }

          if (integration === 'ZAPIER') {
            const response = await prisma.zapierIntegrationRequest.findFirst({
              where: { userId: user.id },
            });

            if (response) {
              requested = true;
              integrationNew = integration;
            }
          }

          if (integration === 'SUNSAMA') {
            const response = await prisma.sunsamaIntegrationRequest.findFirst({
              where: { userId: user.id },
            });

            if (response) {
              requested = true;
              integrationNew = integration;
            }
          }

          if (integration === 'OBSIDIAN') {
            const response = await prisma.obsidianIntegrationRequest.findFirst({
              where: { userId: user.id },
            });

            if (response) {
              requested = true;
              integrationNew = integration;
            }
          }

          if (integration === 'MONDAY') {
            const response = await prisma.mondayIntegrationRequest.findFirst({
              where: { userId: user.id },
            });

            if (response) {
              requested = true;
              integrationNew = integration;
            }
          }

          if (integration === 'GMAIL') {
            const response = await prisma.gmailIntegrationRequest.findFirst({
              where: { userId: user.id },
            });

            if (response) {
              requested = true;
              integrationNew = integration;
            }
          }

          if (integration === 'GITHUB') {
            const response = await prisma.githubIntegrationRequest.findFirst({
              where: { userId: user.id },
            });

            if (response) {
              requested = true;
              integrationNew = integration;
            }
          }

          if (integration === 'EVERNOTE') {
            const response = await prisma.evernoteIntegrationRequest.findFirst({
              where: { userId: user.id },
            });

            if (response) {
              requested = true;
              integrationNew = integration;
            }
          }

          if (integration === 'CRAFT') {
            const response = await prisma.craftIntegrationRequest.findFirst({
              where: { userId: user.id },
            });

            if (response) {
              requested = true;
              integrationNew = integration;
            }
          }

          if (requested !== null && integrationNew !== null) {
            return {
              integration: integrationNew,
              requested,
            };
          } else {
            return null;
          }
        } catch (e) {
          throw e;
        }
      },
    });
  },
});

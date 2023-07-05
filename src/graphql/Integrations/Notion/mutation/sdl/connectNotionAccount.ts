import { extendType, stringArg, nonNull } from 'nexus';

interface NotionAccountOAuth {
  access_token: string;
  token_type: 'bearer';
  bot_id: string;
  workspace_name: string;
  workspace_icon: string;
  workspace_id: string;
  owner: {
    type: 'user';
    user: { object: 'user'; id: string };
  };
  duplicated_template_id: null | string;
}

export const connectNotionAccount = extendType({
  type: 'Mutation',

  definition(t) {
    t.nonNull.field('connectNotionAccount', {
      type: 'NotionAccount',

      args: {
        notionCode: nonNull(stringArg()),
      },

      async resolve(__, { notionCode }, { prisma, clerkUserId }, ___) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          const clientId = process.env.NOTION_MAIN_OAUTH_CLIENT_ID!;
          const clientSecret = process.env.NOTION_MAIN_OAUTH_CLIENT_SECRET!;
          const redirectUri =
            process.env.NODE_ENV === 'production'
              ? 'https://app.audea.id/app/integrations/notion'
              : 'http://localhost:3000/app/integrations/notion';

          // encode in base 64
          const encoded = Buffer.from(`${clientId}:${clientSecret}`).toString(
            'base64'
          );

          const response = await fetch(
            'https://api.notion.com/v1/oauth/token',
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Basic ${encoded}`,
              },
              body: JSON.stringify({
                grant_type: 'authorization_code',
                code: notionCode,
                redirect_uri: redirectUri,
              }),
            }
          );

          const responseData: NotionAccountOAuth = await response.json();

          const notionAccount = await prisma.notionAccount.create({
            data: {
              createdAt: new Date(),
              accessToken: responseData.access_token,
              workspaceName: responseData.workspace_name,
              workspaceIcon: responseData.workspace_icon,
              workspaceId: responseData.workspace_id,
              ownerUserId: responseData.owner.user.id,
              botId: responseData.bot_id,
              userId: user.id,
              clerkUserId: user.clerkUserId,
              automaticPost: false,
            },
          });

          return notionAccount;
        } catch (e) {
          throw e;
        }
      },
    });
  },
});

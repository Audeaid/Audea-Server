import { Client } from '@notionhq/client';
import { extendType } from 'nexus';

interface NotionDatabase {
  object: string;
  id: string;
  cover: null | string;
  icon: null | { type: string; external: { url: string } };
  created_time: string;
  created_by: { object: string; id: string };
  last_edited_by: { object: string; id: string };
  last_edited_time: string;
  title:
    | {
        type: string;
        text: { content: string; link: null | string };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: null | string;
      }[]
    | [];
  description: [];
  is_inline: boolean;
  properties: any;
  parent: any;
  url: string;
  public_url: null | string;
  archived: boolean;
}

export const getAllAllowedNotionDatabase = extendType({
  type: 'Query',
  definition(t) {
    t.list.nonNull.field('getAllAllowedNotionDatabase', {
      type: 'NotionDatabase',

      async resolve(__, ____, { prisma, clerkUserId }, ___) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          const notionAccount = await prisma.notionAccount.findFirstOrThrow({
            where: { userId: user.id },
          });

          const notion = new Client({
            auth: notionAccount.accessToken,
          });

          const databaseSearch = (
            await notion.search({
              filter: { value: 'database', property: 'object' },
            })
          ).results as NotionDatabase[];

          const response = databaseSearch
            .filter((v) => v.object === 'database' && v.archived === false)
            .map((v) => {
              return {
                id: v.id,
                icon: (() => {
                  if (v.icon) {
                    if (v.icon.type === 'external') {
                      const externalUrl = v.icon.external.url;

                      if (externalUrl[0] === '/') {
                        return `https://notion.so${externalUrl}`;
                      } else {
                        return externalUrl;
                      }
                    } else {
                      return null;
                    }
                  } else {
                    return null;
                  }
                })(),
                title: v.title.length > 0 ? v.title[0].plain_text : 'Untitled',
                url: v.hasOwnProperty('url') ? v.url : null,
              };
            });

          return response ?? null;
        } catch (error) {
          throw error;
        }
      },
    });
  },
});

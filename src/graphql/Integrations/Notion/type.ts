import { objectType } from 'nexus';

export const NotionAccount = objectType({
  name: 'NotionAccount',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.dateTime('createdAt');
    t.nonNull.string('accessToken');
    t.nonNull.string('workspaceName');
    t.string('workspaceIcon');
    t.nonNull.string('workspaceId');
    t.nonNull.string('ownerUserId');
    t.nonNull.string('botId');
    t.nonNull.string('userId');
    t.nonNull.string('clerkUserId');
    t.string('primaryDatabase');
    t.nonNull.boolean('automaticPost');
  },
});

export const NotionDatabase = objectType({
  name: 'NotionDatabase',
  definition(t) {
    t.nonNull.string('id');
    t.string('icon');
    t.nonNull.string('title');
    t.string('url');
  },
});

export const GeneratedNotionPage = objectType({
  name: 'GeneratedNotionPage',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('notionPageId');
    t.nonNull.string('url');
    t.nonNull.string('contentId');
    t.nonNull.string('notionAccountId');
  },
});

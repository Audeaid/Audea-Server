import { enumType, objectType } from 'nexus';

export const Content = objectType({
  name: 'Content',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.dateTime('createdAt');
    t.string('title');
    t.string('voiceNoteUrl');
    t.string('transcript');
    t.string('gptGenerated');
    t.string('typeOfPromptId');
    t.nonNull.string('userId');
    // t.field('generatedNotionPage', {
    //     type: 'GeneratedNotionPage'
    // })
  },
});

export const ContentSubscriptionType = objectType({
  name: 'ContentSubscriptionType',
  definition(t) {
    t.nonNull.field('mutationType', {
      type: 'typeOfMutationType',
      description: 'The type of mutationType. Either `ADD` `EDIT` or `DELETE`',
    });

    t.nonNull.field('content', { type: 'Content' });
  },
});

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

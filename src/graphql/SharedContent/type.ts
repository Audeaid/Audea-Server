import { objectType } from 'nexus';

export const SharedContent = objectType({
  name: 'SharedContent',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.dateTime('createdAt');
    t.nonNull.string('title');
    t.nonNull.string('gptObject');
    t.nonNull.string('userId');
    t.nonNull.string('contentId');
    t.nonNull.string('username');
    t.nonNull.string('generatedId');
    t.nonNull.string('description');
  },
});

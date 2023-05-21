import { enumType, objectType } from 'nexus';

export const TypeOfPrompt = objectType({
  name: 'TypeOfPrompt',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('displayName');
    t.nonNull.string('systemPrompt');
    t.nonNull.dateTime('createdAt');
  },
});

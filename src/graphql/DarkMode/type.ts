import { objectType } from 'nexus';

export const DarkMode = objectType({
  name: 'DarkMode',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.boolean('darkMode');
    t.nonNull.string('userId');
  },
});

import { objectType } from 'nexus';

export const ResponseMessage = objectType({
  name: 'ResponseMessage',
  definition(t) {
    t.string('response', {
      description: 'Response message',
    });
  },
});

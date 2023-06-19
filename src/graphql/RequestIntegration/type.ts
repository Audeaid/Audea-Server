import { enumType, objectType } from 'nexus';

export const IntegrationsEnum = enumType({
  name: 'IntegrationsEnum',
  members: [
    'NOTION',
    'ZAPIER',
    'TODOIST',
    'WHATSAPP',
    'SUNSAMA',
    'OBSIDIAN',
    'MONDAY',
    'GMAIL',
    'GITHUB',
    'EVERNOTE',
    'CRAFT',
    'CLICKUP',
  ],
});

export const RequestedIntegration = objectType({
  name: 'RequestedIntegration',
  definition(t) {
    t.nonNull.field('integration', {
      type: 'IntegrationsEnum',
    });
    t.nonNull.boolean('requested');
  },
});

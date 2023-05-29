import { enumType, objectType } from 'nexus';

export const ContentSettings = objectType({
  name: 'ContentSettings',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.dateTime('createdAt');
    t.nonNull.dateTime('lastUpdate');
    t.nonNull.field('user', {
      type: 'User',
    });
    t.nonNull.string('userId');
    t.nonNull.string('writingStyle');
    t.nonNull.field('outputLanguage', { type: 'OutputLanguageEnum' });
    t.nonNull.field('typeOfPrompt', {
      type: 'TypeOfPrompt',
    });
    t.nonNull.string('typeOfPromptId');
  },
});

export const OutputLanguageEnum = enumType({
  name: 'OutputLanguageEnum',
  members: [
    'TRANSCRIPT',
    'ENGLISH',
    'BAHASAINDONESIA',
    'CHINESE',
    'HINDI',
    'JAPANESE',
    'SPANISH',
    'FRENCH',
    'RUSSIAN',
    'URDU',
    'ARABIC',
    'ASK',
  ],
});

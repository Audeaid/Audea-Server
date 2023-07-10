import { extendType, nonNull, stringArg } from 'nexus';

export const createSharedContent = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createSharedContent', {
      type: 'SharedContent',

      args: {
        contentId: nonNull(stringArg()),
      },

      async resolve(__, { contentId }, { prisma, clerkUserId }, ___) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          const content = await prisma.content.findFirstOrThrow({
            where: { id: contentId },
          });

          if (!content.title || !content.gptGenerated || !user.username)
            throw new Error('Title or object or username is null');

          const parseContent: any[] = JSON.parse(content.gptGenerated);

          const gptObject = JSON.stringify(
            parseContent.filter((v) => v.type !== 'title')
          );

          let generatedId: string = '';

          let whileLoopPlaceholder = true;

          while (whileLoopPlaceholder) {
            generatedId = generateFiveRandomChar();

            const response = await prisma.sharedContent.findFirst({
              where: { AND: [{ generatedId }, { username: user.username }] },
            });

            if (response === null) {
              whileLoopPlaceholder = false;
            }
          }

          const response = await prisma.sharedContent.create({
            data: {
              createdAt: new Date(),
              title: content.title,
              gptObject,
              userId: user.id,
              contentId: content.id,
              username: user.username,
              generatedId,
              description: `${user.firstName}'s note titled "${content.title}". Created with Audea.`,
            },
          });

          return response;
        } catch (e) {
          throw e;
        }
      },
    });
  },
});

function generateFiveRandomChar(): string {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_~';
  let result = '';

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

import { nonNull, stringArg, extendType } from 'nexus';

export const pushSupportTicket = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('pushSupportTicket', {
      type: 'ResponseMessage',

      args: {
        area: nonNull(stringArg()),
        severityLevel: nonNull(stringArg()),
        subject: nonNull(stringArg()),
        description: nonNull(stringArg()),
      },

      async resolve(
        __,
        { area, severityLevel, subject, description },
        { resend, clerkUserId, prisma, notionInternal },
        ___
      ) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          if (!user.notionPageId) throw new Error('notionPageId is null.');

          const response = await notionInternal.pages.create({
            parent: {
              database_id: 'b2e49a6295a043afa32be7d2ae30a840',
            },
            properties: {
              Name: {
                title: [
                  {
                    text: {
                      content: subject,
                    },
                  },
                ],
              },

              'Issue type': {
                select: {
                  name: renderArea(area),
                },
              },

              Severity: {
                select: {
                  name: renderSeverityLevel(severityLevel),
                },
              },

              Audeance: { relation: [{ id: user.notionPageId }] },
            },
            children: transformStringToBlocks(description),
          });

          await resend.sendEmail({
            from: 'Audea (NO REPLY) <no_reply@kudoku.id>',
            to: user.email,
            subject: 'Issue has been submitted!',
            html: `
            <p>Your issue has been submitted and currently under review.</p>

            <p>Please note that it can take up to 72 hours for your issue to process since we are a startup with a very few people involved. But, we are trying to process as quickly as we can!</p>

            <p>You'll hear from one of the team very soon regarding your issue.</p>
            `,
          });

          return { response: JSON.stringify(response) };
        } catch (error) {
          throw error;
        }
      },
    });
  },
});

const renderSeverityLevel = (severityLevel: string) => {
  switch (severityLevel) {
    case '1':
      return 'Level 1';

    case '2':
      return 'Level 2';

    case '3':
      return 'Level 3';

    case '4':
      return 'Level 4';

    case '5':
      return 'Level 5';

    default:
      return 'Level 5';
  }
};

const renderArea = (area: string) => {
  switch (area) {
    case 'other':
      return 'Other';

    case 'bug':
      return 'Bug';

    case 'account':
      return 'Account';

    case 'integration':
      return 'Integration';

    case 'billing':
      return 'Billing';

    default:
      return 'Other';
  }
};

type Block = {
  object: 'block';
  paragraph: {
    rich_text: {
      text: {
        content: string;
      };
    }[];
  };
};

function transformStringToBlocks(text: string): Block[] {
  const paragraphs = text.split('\n\n');

  const blocks: Block[] = paragraphs.map((paragraph) => ({
    object: 'block',
    paragraph: {
      rich_text: [
        {
          text: {
            content: paragraph.trim(),
          },
        },
      ],
    },
  }));

  return blocks;
}

import { Client } from '@notionhq/client';
import { extendType } from 'nexus';

export const getNotionTitleName = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getNotionTitleName', {
      type: 'ResponseMessage',

      async resolve(__, ____, { prisma, clerkUserId }, ___) {
        try {
          if (!clerkUserId) throw new Error('Invalid token.');

          const user = await prisma.user.findFirstOrThrow({
            where: { clerkUserId },
          });

          const notionAccount = await prisma.notionAccount.findFirstOrThrow({
            where: { userId: user.id },
          });

          if (!notionAccount.primaryDatabase)
            throw new Error('User have not yet set a primary database');

          const notion = new Client({
            auth: notionAccount.accessToken,
          });

          const prop = await notion.databases.retrieve({
            database_id: notionAccount.primaryDatabase,
          });

          const titleProperties = Object.entries(prop.properties)
            .filter(([_, value]) => value.type === 'title')
            .map(([key]) => key)[0];

          return { response: titleProperties };
        } catch (error) {
          throw error;
        }
      },
    });
  },
});

export const summariseMyThoughts = (
  database_id: string,
  titleProperties: string,
  title: string,
  parseContentString: string
) => {
  const parseContent = JSON.parse(parseContentString);

  const children = [
    {
      object: 'block',
      paragraph: {
        rich_text: [
          {
            text: {
              content: 'Created with ',
            },
          },

          {
            text: {
              content: 'Audea',
              link: {
                url: 'https://app.audea.id',
              },
            },
          },
        ],
        color: 'default',
      },
    },

    {
      object: 'block',
      divider: {},
    },

    {
      object: 'block',
      paragraph: {
        rich_text: [
          {
            text: {
              content: '',
            },
          },
        ],
      },
    },
  ];

  for (let i = 0; i < parseContent.length; i++) {
    const element = parseContent[i];

    if (element.type === 'paragraph') {
      const obj = {
        object: 'block',
        paragraph: {
          rich_text: [
            {
              text: {
                content: element.content,
              },
            },
          ],
          color: 'default',
        },
      };

      children.push(obj);
    }
  }

  const response = {
    parent: {
      database_id,
    },
    properties: {
      [titleProperties]: {
        title: [
          {
            text: {
              content: title,
            },
          },
        ],
      },
    },
    children,
  };
  return response;
};

const test = [
  {
    type: 'title',
    content: "Indonesia's Contribution to Climate Change Mitigation",
  },
  {
    type: 'paragraph',
    content:
      'Joint global solidarity, partnership, collaboration, and cooperation are key in mitigating the threat of climate change and ensuring sustainable development globally. Despite facing significant challenges, Indonesia, with its vast natural resources, continues to contribute to the mitigation of climate change.',
  },
  {
    type: 'paragraph',
    content:
      "In the past twenty years, deforestation rate in Indonesia has significantly dropped to its lowest point. Additionally, forest fires have decreased by 82% in 2020. Indonesia has also initiated the rehabilitation of the world's largest mangrove forest covering over 600,000 hectares and is expected to be completed by 2024. In the years 2010-2019, Indonesia has successfully rehabilitated over 3 million hectares of critically degraded land.",
  },
  {
    type: 'paragraph',
    content:
      "Furthermore, following its commitment to achieve a carbon net sink by 2030, the sector that previously contributed 60% to Indonesia's greenhouse gas emissions is now mitigated. In the energy sector, Indonesia has made significant progress by developing electric vehicle ecosystems, building the largest solar power plants in Southeast Asia, using renewable energy, such as biofuels, and developing clean energy-based industries, including the world's largest green industrial zone in North Kalimantan.",
  },
  {
    type: 'paragraph',
    content:
      'However, these efforts alone are not enough. As a country with vast greenery and potential to be reforested as well as having vast sea areas with carbon potential, Indonesia requires support and contribution from international, especially major developed countries. With the mobilization of climate and innovative finance as well as green and sukuk bond, Indonesia can contribute more towards achieving a net-zero emission world. But, how significant is the contribution of developed countries to Indonesia, and what technology transfer can be provided? It requires immediate implementation and action. Carbon markets and pricing must be part of climate change mitigation efforts. A transparent, inclusive, and fair carbon economic ecosystem must be established. Thank you.',
  },
];

import {
  blankSpace,
  createdWithAudea,
  divider,
  tableOfContent,
} from './utilityBlock';

export const bulletPointsWithSummary = (
  database_id: string,
  titleProperties: string,
  title: string,
  parseContentString: string
) => {
  const parseContent = JSON.parse(parseContentString);

  const children: any[] = [
    createdWithAudea,
    divider,
    blankSpace,
    tableOfContent,
  ];

  for (let i = 0; i < parseContent.length; i++) {
    const element = parseContent[i];

    if (element.type === 'heading_1') {
      const obj = {
        object: 'block',
        heading_1: {
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
    } else if (element.type === 'heading_2') {
      const obj = {
        object: 'block',
        heading_2: {
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
    } else if (element.type === 'paragraph') {
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
    } else if (element.type === 'bulleted_list_item') {
      const obj = {
        object: 'block',
        bulleted_list_item: {
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

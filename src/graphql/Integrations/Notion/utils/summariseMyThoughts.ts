import { blankSpace, createdWithAudea, divider } from './utilityBlock';

export const summariseMyThoughts = (
  database_id: string,
  titleProperties: string,
  title: string,
  parseContentString: string
) => {
  const parseContent = JSON.parse(parseContentString);

  const children = [createdWithAudea, divider, blankSpace];

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

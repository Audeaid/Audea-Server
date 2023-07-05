export const blankSpace = {
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
};

export const divider = {
  object: 'block',
  divider: {},
};

export const createdWithAudea = {
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
};

export const tableOfContent = {
  object: 'block',
  table_of_contents: {},
};

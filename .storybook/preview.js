export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: {
      iphonex: {
        name: 'iPhone X',
        styled: {
          width: '375px',
          height: '812px',
        },
      },
    },
  },
  backgrounds: {
    values: [
      {
        name: 'grey',
        value: '#808080',
      },
    ],
  },
};

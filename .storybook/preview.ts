import type { Preview } from "@storybook/react";
import 'bootstrap/dist/css/bootstrap.css';
import '../src/styles/globals.scss';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'dark',
    },
  },
};

export default preview;

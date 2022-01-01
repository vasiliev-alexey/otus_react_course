import customConfig from '../webpack.config';

const custCfg = customConfig(
  { production: false, development: true },
  { mode: 'production' }
);

module.exports = {
  stories: [
    '../src/components/game/GameView.stories.tsx', // default page
    '../src/components/**/*.stories.@(tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-scss',
  ],
  core: {
    builder: 'webpack5',
  },

  webpackFinal: async (config) => {
    let cgf = {
      ...config,
      plugins: [...config.plugins, ...custCfg.plugins],
      module: {
        ...config.module,
        rules: custCfg.module.rules,
      },
    };
    return cgf;
  },

  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
};

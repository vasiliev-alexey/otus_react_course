module.exports = {
  presets: [
    ['@babel/preset-env'],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
    '@emotion/babel-plugin',
  ],
};

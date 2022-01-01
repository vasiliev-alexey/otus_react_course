import { GitRevisionPlugin } from 'git-revision-webpack-plugin';
import 'webpack-dev-server';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import * as webpack from 'webpack';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

import * as path from 'path';

const gitRevisionPlugin = new GitRevisionPlugin();
const envPluginProd = new webpack.EnvironmentPlugin([
  'REACT_APP_API_KEY',
  'REACT_APP_AUTHDOMAIN',
  'REACT_APP_BASEURL',
  'REACT_APP_PROJECT_ID',
  'REACT_APP_STORAGEBUCKET',
  'REACT_APP_MESSAGING_SENDER_ID',
  'REACT_APP_APP_ID',
]);

const envPluginDev = new webpack.EnvironmentPlugin([]);

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const Dotenv = require('dotenv-webpack');

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const getTsConfigName = (mode: string) =>
  mode === 'production' ? 'tsconfig.prod.json' : 'tsconfig.dev.json';
const webpackConfig = (
  env: {
    production: boolean;
    development: boolean;
  },
  arg: {
    mode: string;
  }
): Configuration => ({
  entry: './src/index.tsx',
  devServer: {
    historyApiFallback: true,
    hot: true,

    open: 'google-chrome',
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],

    //@ts-ignore
    plugins: [
      new TsconfigPathsPlugin({
        configFile: getTsConfigName(arg.mode),
      }),
    ],
  },
  output: {
    path: path.join(
      __dirname,
      arg.mode === 'production' ? '../../dist/tetris' : 'dist'
    ),

    filename: 'index.js',
  },

  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react',
            '@babel/preset-env',
            '@babel/preset-typescript',
          ],
          plugins: [
            '@babel/plugin-transform-runtime',
            'babel-plugin-jsx-remove-data-test-id',
            // https://github.com/webpack/webpack/issues/9173
            //'@babel/plugin-transform-block-scoping',
          ],
        },
        exclude: /dist/,
      },

      {
        test: /\.(sass|scss|css)$/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
        // include: [path.resolve(__dirname, '../public')],
      },

      { test: /\.(mp3)$/, loader: 'file-loader' },
      {
        test: /\.(jpg|svg|png)$/,
        loader: 'url-loader',
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,

        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    gitRevisionPlugin,
    arg.mode === 'production'
      ? envPluginProd
      : new Dotenv({
          safe: true,
          path: path.resolve(__dirname, '.env'),
        }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(gitRevisionPlugin.version()),
      COMMITHASH: JSON.stringify(gitRevisionPlugin.commithash()),
      BRANCH: JSON.stringify(gitRevisionPlugin.branch()),
      LASTCOMMITDATETIME: JSON.stringify(
        gitRevisionPlugin.lastcommitdatetime()
      ),

      'process.env.PRODUCTION': env.production || !env.development,
      'process.env.NAME': JSON.stringify(require('../../package.json').name),
      'process.env.VERSION': JSON.stringify(
        require('../../package.json').version
      ),
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: '../assets/images/tetris.png',
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx}',
      },
      typescript: {
        tsconfig: getTsConfigName(arg.mode),
        configFile: getTsConfigName(arg.mode),
      },
    }),
  ],
});

export default webpackConfig;

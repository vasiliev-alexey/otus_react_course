/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
import 'webpack-dev-server';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import * as webpack from 'webpack';

import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

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
  entry: './src/index.ts',
  // ...(env.production || !env.development ? {} : { devtool: 'source-map' }),
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/27570
  devServer: {
    historyApiFallback: true,
    hot: true,

    open: 'google-chrome',
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    //TODO waiting on https://github.com/dividab/tsconfig-paths-webpack-plugin/issues/61
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
      arg.mode === 'production' ? '../../dist/' : 'dist'
    ),

    filename: 'index.js',
  },

  performance: {
    hints: false,
  },
  module: {
    rules: [],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: '../assets/images/owl.png',
    }),
    new Dotenv({
      safe: true,
      path: path.resolve(__dirname, '.env'),
    }),
    new webpack.DefinePlugin({
      'process.env.PRODUCTION': env.production || !env.development,
      'process.env.NAME': JSON.stringify(require('../../package.json').name),
      'process.env.VERSION': JSON.stringify(
        require('../../package.json').version
      ),
    }),

    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx}', // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
      },
      typescript: {
        configFile: getTsConfigName(arg.mode),
      },
    }),
  ],
});

export default webpackConfig;

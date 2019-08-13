const { join } = require("path");
const { sync } = require('glob');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  plugins: [
    new ExtractTextPlugin('[name].[chunkhash].css'),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        exclude: /node_modules/,
        include: [
          join(__dirname, '../stories'),
          join(__dirname, '../src'),
        ],
      },
      {
        test: /\.(jpg|png|svg|cur|ico|gif)$/,
        exclude: /node_modules/,
        loader: 'file-loader?name=public/images/[name].[ext]',
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf)$/,
        exclude: /node_modules/,
        loader: 'file-loader?name=public/fonts/[name].[ext]',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          }, 'resolve-url-loader', {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: sync('node_modules').map((d) => join(__dirname, d)),
              },
            },
          ],
        }),
      }
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  }
};

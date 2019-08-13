const Webpack = require('webpack');

const { join, resolve } = require("path");

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StyleLintPlugin = require("stylelint-webpack-plugin");

const { injectBuildNumber } = require('./utils/buildNumber');

const commonConfig = () => {
    const commonConfigObj = {};

    commonConfigObj.entry = "./src/index.tsx";
    commonConfigObj.output = {
        path: resolve(__dirname, "../dist"),
        publicPath: "/",
        filename: "[name].[hash].js",
    };
    commonConfigObj.node = { console: false, fs: 'empty', net: 'empty', tls: 'empty' };
    commonConfigObj.module = {
        rules: [{
            test: /\.tsx?$/,
            loader: "awesome-typescript-loader",
            exclude: /node_modules/,
            include: [join(__dirname, '../src')],
        },
        {
            test: /\.(jpg|png|svg|cur|ico|gif)$/,
            exclude: /node_modules/,
            loader: 'file-loader?name=public/images/[name].[ext]',
        },
        {
            test: /\.(eot|ttf|woff|woff2)$/,
            exclude: /node_modules/,
            loader: 'file-loader?name=public/fonts/[name].[ext]',
        }]
    };
    commonConfigObj.optimization = {
        runtimeChunk: {
            name: 'vendor'
        },
        splitChunks: {
            cacheGroups: {
                default: false,
                commons: {
                    test: /node_modules/,
                    name: 'vendor',
                    chunks: 'initial',
                    minSize: 1
                }
            }
        }
    };
    commonConfigObj.resolve = {
        extensions: [".ts", ".tsx", ".js", ".json"],
    }
    commonConfigObj.plugins = [
        new ExtractTextPlugin('[name].[chunkhash].css'),
        new HtmlWebpackPlugin({
            title: "Token 4 hope",
            template: 'index.html',
            filename: 'index.html',
            assets: process.env.NODE_ENV === 'development' ? 'assets' : 'public',
            inject: true,
            buildNumber: injectBuildNumber(process.env.BUILD_NUMBER),
        }),
        new StyleLintPlugin({
            files: ["src/**/*.scss", "assets/styles/**/*.scss"]
        }),
    ];

    return commonConfigObj;
}

module.exports = commonConfig;

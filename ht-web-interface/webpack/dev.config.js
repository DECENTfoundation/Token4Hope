require('dotenv-safe').config();
const Webpack = require('webpack');

const { join } = require("path");
const { sync } = require('glob');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const commonConfig = require("./common.config.js");

const devConfig = () => {
    return {
        ...commonConfig(),
        mode: "development",
        devtool: "source-map",
        watch: true,
        devServer: {
            host: '0.0.0.0',
            port: 3004,
            historyApiFallback: true,
            publicPath: '/',
        },
        module: {
            rules: [
                ...commonConfig().module.rules,
                {
                    test: /\.css/,
                    use: ExtractTextPlugin.extract({
                        use: [
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true,
                                },
                            },
                            'resolve-url-loader',
                        ],
                    }),
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
            ]
        },
        plugins: [
            ...commonConfig().plugins,
            new Webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('development'),
                    'GATEWAY_BASE_URL': JSON.stringify(process.env.GATEWAY_BASE_URL),
                }
            }),
        ]
    }
}

module.exports = devConfig;
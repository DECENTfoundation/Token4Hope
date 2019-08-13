const Webpack = require('webpack');

const { join, resolve } = require("path");
const { sync } = require('glob');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackShellPlugin = require("webpack-shell-plugin");

const commonConfig = require("./common.config.js");

const prodConfig = (__env, { build }) => {
    return {
        ...commonConfig(build),
        mode: "production",
        output: {
            path: resolve(__dirname, "../dist"),
            publicPath: "./",
            filename: "[name].[hash].js"
        },
        module: {
            ...commonConfig(build).module,
            rules: [
                ...commonConfig(build).module.rules,
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
                    test: /\.scss/,
                    use: ExtractTextPlugin.extract({
                        use: ['css-loader', 'resolve-url-loader', {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                includePaths: sync('node_modules').map((d) => join(__dirname, d)),
                            },
                        }],
                    }),
                    exclude: /node_modules/,
                }
            ]
        },
        plugins: [
            ...commonConfig(build).plugins,
            new Webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production'),
                    'GATEWAY_BASE_URL': JSON.stringify(process.env.GATEWAY_BASE_URL),
                }
            }),
            new WebpackShellPlugin({
                onBuildEnd: ['node webpack/post.build.config.js']
            })
            // new BundleAnalyzerPlugin(),
        ]
    }
}

module.exports = prodConfig;

import HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolve } from 'path';
import webpack from 'webpack';
import WebpackNotifierPlugin from 'webpack-notifier';

// Common config.
import {
    buildPath,
    entry,
    extensions,
    plugins,
    rules,
    srcPath,
    title,
} from './common.config';

const localhost = 'http://localhost';
const webPort = 1337;

export default {
    devServer: {
        contentBase: buildPath,
        historyApiFallback: true,
        host: '0.0.0.0',
        port: webPort,
    },

    devtool: 'source-map',

    entry: [
        `webpack-dev-server/client?${localhost}:${webPort}`,
        'webpack/hot/only-dev-server'
    ].concat(entry),

    mode: 'development',

    module: {
        rules
    },

    output: {
        filename: 'bundle.js',
        path: buildPath,
        publicPath: '/'
    },

    plugins: plugins.concat([
        new HtmlWebpackPlugin({
            title,
            isDevelopment: true,
            inject: 'body',
            template: resolve(srcPath, 'index.hbs'),
            minify: false
        }),
        new webpack.HotModuleReplacementPlugin(),
        new WebpackNotifierPlugin({
            title: 'UNICORN POWER_UP!!!',
            contentImage: resolve(__dirname, 'unicorn.png'),
            alwaysNotify: true
        })
    ]),

    resolve: {
        extensions
    }
};

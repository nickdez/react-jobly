const path = require('path');
const webpack = require('webpack');  // <-- Ensure this line is here

module.exports = function override(config, env) {
    if (!config.resolve) {
        config.resolve = {};
    }

    if (!config.resolve.alias) {
        config.resolve.alias = {};
    }

    // Map certain node modules to browser-friendly versions
    config.resolve.alias = {
        ...config.resolve.alias,
        'crypto': path.resolve(__dirname, 'node_modules/crypto-browserify'),
        'stream': path.resolve(__dirname, 'node_modules/stream-browserify'),
        'assert': path.resolve(__dirname, 'node_modules/assert/'),
        'os': path.resolve(__dirname, 'node_modules/os-browserify/browser.js')
    };

    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    );

    return config;
};











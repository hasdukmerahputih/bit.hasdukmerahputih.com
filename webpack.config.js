const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const env = require('dotenv').config();

const redirects = require('./src/redirects');
let fileTree = [
    { from: './index.html', to: '../404.html' },
];

for(let i = 0; i < redirects.length; i++){
    fileTree.push({ from: './index.html', to: '..' + redirects[i].slug + '/index.html' })
}
console.log(fileTree);

module.exports = env => {
    return {
        entry: './src/app.js',
        mode: 'production',
        node: {
            fs: "empty"
        },
        output: {
            filename: 'app.min.js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins:[
            new webpack.EnvironmentPlugin(['PASSTHROUGH']),
            new CopyPlugin(fileTree),
        ],
    }
};
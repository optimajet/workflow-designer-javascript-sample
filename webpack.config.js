const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = ({development}) => ({
    entry: {
      wfesample: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].min.js',
        libraryTarget: "umd",
    },
    target: ['web', 'es5'],
    mode:'production',
 
    optimization: {
        minimizer: [new TerserPlugin()],
    },
    module: {
        rules: [
            {
              test: /\.css$/i,
              use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
              test: /\.(js|jsx)$/,
              exclude: /@babel(?:\/|\\{1,2})runtime|core-js/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      babelrc: false,
                      configFile: path.resolve(__dirname, 'babel.config.js'),
                      compact: false,
                      cacheDirectory: true,
                      sourceMaps: false,
                  },
              },
          },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new MiniCssExtractPlugin(),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
        new CleanWebpackPlugin(),
    ]
});

var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const path = require('path');

module.exports = {
optimization:{
minimizer: [
new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({}),
],
},
mode: "production",
entry: "./src/index.js",
output:{
filename: "dist/[name].[contenthash].js",
path: path.resolve(__dirname,"")
},
plugins:[
new Dotenv({
path: path.resolve(__dirname, "process.env"),
default: false,
}),
new HtmlWebpackPlugin({
template: 'src/template.html',
}),
new MiniCssExtractPlugin({
filename: 'dist/[name].[contenthash].css',
chunkFilename: '[id].css',
}),
],
module: {
rules: [
{
test: /\.(png|jpe?g|gif)$/i,
use: [
{
loader: 'url-loader',
options:{
limit: 8192,
outputPath:'/img',
publicPath: '../img'
}
},
],
},
{
test: /\.css$/,
use: [
{
loader: MiniCssExtractPlugin.loader,
options: {
publicPath: '/public/path/to/',
},
},
'css-loader',
],
  },
  {
      test: require.resolve('jquery'),
      use: [{
        loader: 'expose-loader',
        options: '$'
      }]
    },
  ],
},
}

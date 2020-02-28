var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');
module.exports = {
  devServer: {
  contentBase: path.join(__dirname, 'dist'),
  compress: true,
  port: 9000
},


mode: "development",
entry: "./src/index.js",
output:{
filename: "dist/output.js",
path: path.resolve(__dirname,"")
},

plugins:[
new HtmlWebpackPlugin({
template: 'src/template.html',
}),

new Dotenv({
path: path.resolve(__dirname, "process.env"),
default: false,


}),
new MiniCssExtractPlugin({
filename: 'dist/style.css',
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

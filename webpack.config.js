const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');

// App directory
const appDirectory = fs.realpathSync(process.cwd());

// Gets absolute path of file within app directory
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);

// Host
const host = process.env.HOST || 'localhost';

// Required for babel-preset-react-app
process.env.NODE_ENV = 'development';

module.exports = {

  // Environment mode
  mode: 'development',

  // Entry point of app
  entry: resolveAppPath('./src/index.tsx'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.ico$/,
        use: 'file-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {

    // Development filename output
    filename: 'static/js/bundle.js',
  },
  devServer: {

    // Serve index.html as the base
    contentBase: resolveAppPath('public'),

    // Enable compression
    compress: true,

    // Enable hot reloading
    hot: true,

    host,

    port: 5000,

    // Public path is root of content base
    publicPath: '/',

  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: resolveAppPath('public/index.html'),
    }),
      new InterpolateHtmlPlugin({
        PUBLIC_URL: 'static' // can modify `static` to another name or get it from `process`
    })
  ],
};
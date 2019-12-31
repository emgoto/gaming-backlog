const path = require('path');

var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    index: './src/index.ts',
    settings: './src/settings.ts',
    auth: './src/auth.ts'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/docs/js'
  },

  plugins : [ 
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsOptions: { source: false }
    }),
  ],

  // Currently we need to add '.ts' to the resolve.extensions array.
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  node: {
    fs: "empty"
  },
  

  // Source maps support ('inline-source-map' also works)
  devtool: 'source-map',

  // Add the loader for .ts files.
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: [path.resolve(__dirname, 'test/*')]
      }
    ]
  }
};

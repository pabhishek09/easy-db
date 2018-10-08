const path = require('path');

// var config = {
//   entry: './src/index.js',
//   output: {
//     filename: 'app.bundle.js',
//     path: path.resolve(__dirname, 'dist')
//   },
//   module: {
//     rules: [{
//       test: /\.js$/,
//       exclude: /node_modules/,
//       use: {
//         loader: 'babel-loader',
//         options: {
//           presets: [ "es2015", "stage-0" ]
//         }
//       }
//     }]
//   },
//   node: {
//     fs: 'empty'
//   }
// };

// module.exports = (env, argv) => {

//   if (argv.mode === 'development') {
//     config.devtool = 'source-map';
//   }

//   if (argv.mode === 'production') {
//   }

//   return config;

// };

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  node: {
    fs: 'empty'
  }
};

const path = require('path');

module.exports = {
  context: __dirname,
  entry: './app.js',
  mode: 'development',
  plugins: [],
  stats: 'none',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              cwd: __dirname
            }
          },
          {
            loader: 'eslint-loader',
            // TODO: allow for custom eslint configs
            options: {
              configFile: path.resolve(__dirname, '../', '../', '.eslintrc'),
              // TODO: check for .prettierrc or prettier defined in package.json
              // and allow them ot override this
              baseConfig: {
                rules: {
                  'prettier/prettier': [
                    'error',
                    {
                      singleQuote: true
                    }
                  ]
                }
              }
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: 'bundle.js'
  }
};

const path = require('path');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const MyExampleWebpackPlugin = require('./utils/CustomOutputPlugin');
const webpackConfig = require('../config/dev/webpack.dev.config');

const {
  readFile,
  resolveAgainstCwd,
  getEntryPoint,
  fileExists
} = require('./utils');

const getPkgJson = async () => {
  try {
    const pkgJSON = await readFile(resolveAgainstCwd('package.json'), 'utf8');
    const pkg = JSON.parse(pkgJSON);
    return pkg;
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw Error('No package.json found!');
    } else {
      throw err;
    }
  }
};

module.exports = function(opts, stdout) {
  getPkgJson().then(json => {
    const entryPoint = getEntryPoint(json);
    if (!fileExists(entryPoint)) {
      throw Error('Source file does not exist!');
    }

    const config = {
      ...webpackConfig,
      plugins: [
        ...webpackConfig.plugins,
        new MyExampleWebpackPlugin(stdout),
        new Webpack.NormalModuleReplacementPlugin(
          /INJECT_COMPONENT_PATH/,
          path.resolve(process.cwd(), entryPoint)
        )
      ]
    };

    const compiler = Webpack(config);
    const devServerOptions = Object.assign({}, webpackConfig.devServer, {
      contentBase: path.join(__dirname, '../', 'config', 'dev'),
      // open: true,
      open: false,
      hot: true,
      clientLogLevel: 'none',
      quiet: true,
      stats: 'none'
    });
    const server = new WebpackDevServer(compiler, devServerOptions);
    server.listen(8080, '127.0.0.1', error => {
      if (error) {
        throw error;
      }
      stdout('listening');
    });
  });
};

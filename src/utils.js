const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const getEntryPoint = pkg => {
  return pkg.source || 'src/index.js';
};

const fileExists = _path => fs.existsSync(_path);

const readFile = promisify(fs.readFile);

const cwd = process.cwd();

const resolveAgainstCwd = _path => path.resolve(cwd, _path);

module.exports = {
  getEntryPoint,
  fileExists,
  readFile,
  cwd,
  resolveAgainstCwd
};

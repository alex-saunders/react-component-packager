#!/usr/bin/env node
const development = require('./development');

development({}, message => {
  console.log('got message from output:', message);
});

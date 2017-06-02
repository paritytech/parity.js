const path = require('path');

module.exports = {
  context: path.join(__dirname, './'),
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@parity': path.resolve(__dirname, './')
    }
  }
};

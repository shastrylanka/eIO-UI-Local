var grunt = require('grunt');

module.exports = {
  amd: {
    src: [ 'tmp/**/*.amd.js' ],
    dest: 'tmp/yahoo-table.amd.js'
  },
  globals: {
    src: [ 'vendor/loader.js', 'tmp/**/*.amd.js' ],
    dest: 'tmp/yahoo-table.browser.js'
  }
};
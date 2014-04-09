var grunt = require('grunt');

module.exports = {
  options: {
    beautify : {
      ascii_only: true
    },
    report: 'gzip'
  },
  dist: {
    files: [{
     src: 'dist/yahoo-table.js',
     dest: 'dist/yahoo-table.min.js',
    }]
  }
};
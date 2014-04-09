module.exports = {
  build: {
    files: [{
      expand: true,
      cwd: 'tmp',
      src: 'yahoo-table.js',
      dest: 'dist/'
    }]
  }
};
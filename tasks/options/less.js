module.exports = {
  compile: {
    options: {
      dumpLineNumbers: 'comments',
      outputSourceFiles: true,
      sourceMap: true
    },
    files: [{
      expand: true,
      cwd: 'app/styles',
      src: ['app.less', '!**/_*.less'],
      dest: 'tmp/result/assets/',
      ext: '.css'
    }]
  }
};

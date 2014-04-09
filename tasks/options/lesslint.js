module.exports = {
  options: {
      csslint: {
        csslintrc: '.csslintrc'
      },
    },  
  css: {
    src: [
      'tmp/result/assets/app.css'
    ]
  },
  less: {
    src: [
      'app/styles/**/*.less'
    ]
  }
};
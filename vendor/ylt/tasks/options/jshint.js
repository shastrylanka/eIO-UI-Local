module.exports = {
  lib: {
    src: [
      'lib/**/*.js'
    ],
    options: { jshintrc: '.jshintrc', force: true}
  },

  libStrict: {
    src: [
      'lib/**/*.js'
    ],
    options: { jshintrc: '.jshintrc'}
  }
};

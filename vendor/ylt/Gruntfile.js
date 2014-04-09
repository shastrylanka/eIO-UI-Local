module.exports = function(grunt) {
  grunt.loadTasks('tasks');

  var config = require('load-grunt-config')(grunt, {
    configPath: __dirname + '/tasks/options',
    init: false
  });

  config.pkg = require('./package');
  config.env = process.env;

  grunt.initConfig(config);

  grunt.registerTask('buildPackages', [
    'clean',
    'transpile:amd',
    'jshint:lib',
    'concat:globals'
  ]);

  grunt.registerTask('dev', [ 'watch' ]);
  grunt.registerTask('server', 'dev');

  // dist
  grunt.registerTask('dist', ['buildPackages', 'browser:dist', 'uglify']);

  // builds and watches
  grunt.registerTask('default', ['buildPackages', 'browser:dist', 'uglify', 'watch']);
};
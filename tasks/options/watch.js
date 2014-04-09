var Helpers = require('../helpers');

var scripts = '{app,tests}/**/*.{js}',
    templates = 'app/templates/**/*.{hbs,handlebars,hjs}',
    styles = 'app/styles/**/*.{css,less}',
    indexHTML = 'app/index.html',
    stub = 'api-stub/**',
    other = '{app,tests,public}/**/*';

module.exports = {
  scripts: {
    files: [scripts],
    tasks: ['lock', 'buildScripts', 'unlock']
  },
  templates: {
    files: [templates],
    tasks: ['lock', 'buildTemplates:debug', 'unlock']
  },
  stub: {
    files: [stub],
    tasks: []
  },
  styles: {
    files: [styles],
    tasks: ['lock', 'buildStyles', 'unlock']
  },
  indexHTML: {
    files: [indexHTML],
    tasks: ['lock', 'buildIndexHTML:debug', 'unlock']
  },
  other: {
    files: [other, '!'+scripts, '!'+templates, '!'+styles, '!'+indexHTML],
    tasks: ['lock', 'build:debug', 'unlock']
  },

  options: {
    // No need to debounce
    debounceDelay: 0,
    // When we don't have inotify
    interval: 100,
    livereload: Helpers.isPackageAvailable("connect-livereload")
  }
};

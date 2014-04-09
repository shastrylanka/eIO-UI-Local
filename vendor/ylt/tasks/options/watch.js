module.exports = {
  scripts: {
    files: ['lib/**/*.js'],
    tasks: ['default']
  },

  options: {
    spawn: false,
    // No need to debounce
    debounceDelay: 0,
    // When we don't have inotify
    interval: 100
  }
};
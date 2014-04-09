function nameFor(path) {
  var result,  match;
  if (match = path.match(/^(?:lib|test|test\/tests)\/(.*?)(?:\.js)?$/)) {
    result = match[1];
  } else {
    result = path;
  }

  console.log(path);
  
  return "YLT/" + path;
}

module.exports = {
  amd: {
    type: 'amd',
    moduleName: nameFor,
    files: [{
      expand: true,
      cwd: 'lib/',
      src: [ '**/*.js' ],
      dest: 'tmp',
      ext: '.amd.js'
    }]
  }
};
// credit: http://blog.gleitzman.com/post/63925446383/play-it-again-sam-reloading-node-js-modules
require.uncache = function (moduleName) {
    // Run over the cache looking for the files
    // loaded by the specified module name
    require.searchCache(moduleName, function (mod) {
        delete require.cache[mod.id];
    });
};

/**
 * Runs over the cache to search for all the cached
 * files
 */
require.searchCache = function (moduleName, callback) {
    // Resolve the module identified by the specified name
    var mod = require.resolve(moduleName);

    // Check if the module has been resolved and found within
    // the cache
    if (mod && ((mod = require.cache[mod]) !== undefined)) {
        // Recursively go over the results
        (function run(mod) {
            // Go over each of the module's children and
            // run over it
            mod.children.forEach(function (child) {
                run(child);
            });

            // Call the specified callback providing the
            // found module
            callback(mod);
        })(mod);
    }
};

module.exports = function(grunt) {
  var express = require('express'),
      lockFile = require('lockfile'),
      Helpers = require('./helpers'),
      fs = require('fs'),
      path = require('path'),
      request = require('request');

  /**
  Task for serving the static files.

  Note: The expressServer:debug task looks for files in multiple directories.
  */
  grunt.registerTask('expressServer', function(target, proxyMethodToUse) {
    // Load namespace module before creating the server
    require('express-namespace');

    var app = express(),
        done = this.async(),
        proxyMethod = proxyMethodToUse || grunt.config('express-server.options.APIMethod');

    app.use(lock);
    app.use(express.compress());

    if (proxyMethod === 'stub') {
      grunt.log.writeln('Using API Stub');

      // Load API stub routes
      app.use(express.json());
      app.use(express.urlencoded());
      
      grunt.event.on('watch', function(action, filepath, target) {
        if(target === 'stub') {
          require.uncache('../api-stub/routes');
          delete app._router.map.get;
          app._router.map.get = [];
          require('../api-stub/routes')(app);
        }
      });
      
      require('../api-stub/routes')(app);
    } else if (proxyMethod === 'proxy') {
      var proxyURL = grunt.config('express-server.options.proxyURL');
      grunt.log.writeln('Proxying API requests to: ' + proxyURL);

      // Use API proxy
      app.all('/api/*', passThrough(proxyURL));
    }

    if (target === 'debug') {
      // For `expressServer:debug`

      // Add livereload middlware after lock middleware if enabled
      if (Helpers.isPackageAvailable("connect-livereload")) {
        app.use(require("connect-livereload")());
      }

      // These lines simulate what the `copy:assemble` task does
      app.use(static({ urlRoot: '/config', directory: 'config' }));
      app.use(static({ urlRoot: '/vendor', directory: 'vendor' }));
      app.use(static({ directory: 'public' }));
      app.use(static({ urlRoot: '/tests', directory: 'tests' })); // For test_helper.js and test_loader.js

      app.use(static({ directory: 'tmp/result' }));
      app.use(static({ urlRoot: '/fonts', directory: 'public/assets/fonts' }));

      app.use(static({ file: 'tmp/result/index.html' })); // Gotta catch 'em all
    } else {
      // For `expressServer:dist`

      app.use(lock);
      app.use(static({ directory: 'dist' }));
      app.use(static({ file: 'dist/index.html' })); // Gotta catch 'em all
    }

    var port = process.env.PORT || 8000;
    app.listen(port);
    grunt.log.ok('Started development server on port %d.', port);
    if (!this.flags.keepalive) { done(); }
  });


  // Middleware
  // ==========

  function lock(req, res, next) { // Works with tasks/locking.js
    (function retry() {
      if (lockFile.checkSync('tmp/connect.lock')) {
        setTimeout(retry, 30);
      } else { next(); }
    })();
  }

  function static(options) {
    return function(req, res, next) { // Gotta catch 'em all (and serve index.html)
      var filePath = "";

      if (req.url.indexOf('fonts') !== -1) {
        var mimeType = ({
              '.svg':      'image/svg+xml',
              '.ttf':      'application/x-font-ttf',
              '.otf':      'application/x-font-opentype',
              '.woff':     'application/font-woff',
              '.eot':      'application/vnd.ms-fontobject'
            })[path.extname(req.url)];

        res.setHeader('Content-Type', mimeType);
      }

      if (options.directory) {
        var regex = new RegExp('^' + (options.urlRoot || ''));
        // URL must begin with urlRoot's value
        if (!req.path.match(regex)) { next(); return; }
        filePath = options.directory + req.path.replace(regex, '');
      } else if (options.file) {
        filePath = options.file;
      } else { throw new Error('static() isn\'t properly configured!'); }

      fs.stat(filePath, function(err, stats) {
        if (err) { next(); return; } // Not a file, not a folder => can't handle it

        // Is it a directory? If so, search for an index.html in it.
        if (stats.isDirectory()) { filePath = path.join(filePath, 'index.html'); }

        // Serve the file
        res.sendfile(filePath, function(err) {
          if (err) { next(); return; }
          grunt.verbose.ok('Served: ' + filePath);
        });
      });
    };
  }

  function passThrough(target) {
    return function(req, res) {
      req.pipe(request(target+req.url)).pipe(res);
    };
  }
};

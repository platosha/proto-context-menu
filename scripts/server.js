'use strict';

var apiRoot = '/api',
  packageRoot = '/components/' + require('../bower.json').name;

var browserSync = require('browser-sync'),
    log = require('connect-logger');

var bs = browserSync.create();

var routes = {'/components': 'bower_components'};
routes[packageRoot] = '';

bs.init({
  startPath: packageRoot,
  files: ['./**/*.{html,htm,css,js}'],
  watchOptions: {
    ignored: [
      'node_modules',
      'bower_components',
      'scripts'
    ]
  },
  /* Don’t try to rewrite other components html, otherwise iron-overlay-behavior.html breaks in Firefox */
  snippetOptions: {
    blacklist: ['/components/**/*'],
    whitelist: [packageRoot + '/**/*']
  },
  server: {
    baseDir: '.',
    routes: routes
  },
  middleware: [
    log({format: '%date %status %method %url'})
  ]
});

module.exports = {
  all: {
    files: [
      {
        expand: true,
        cwd: 'src/',
        src: ['*/**/*.html'],
        dest: 'dist/',
        filter: 'isFile'
      }
    ]
  },

  dev: {
    options: {
      process: function(content, srcpath) {
        return '(function() {\n' +
          //!!'\'use strict\';\n' +
          content + '\n' +
          '})();';
      }
    },
    files: [
      {
        expand: true,
        cwd: 'src/',
        src: '**/*.js',
        dest: 'dist/',
        filter: 'isFile'
      }
    ]
  },

  prodLibs: {
    files: [
      {
        expand: true,
        cwd: 'bower_components/angular/',
        src: [
          'angular.min.js',
          'angular.min.js.map'
        ],
        dest: 'dist/libs/angular/',
        filter: 'isFile'
      },
      {
        expand: true,
        cwd: 'bower_components/bootstrap-bower/',
        src: [
          'css/bootstrap.min.css',
          'css/bootstrap-theme.min.css',
          'fonts/*'
        ],
        dest: 'dist/libs/bootstrap/',
        filter: 'isFile'
      },
      {
        expand: true,
        cwd: 'bower_components/angular-animate/',
        src: [
          'angular-animate.min.js',
          'angular-animate.min.js.map'
        ],
        dest: 'dist/libs/angular-animate/',
        filter: 'isFile'
      },
      {
        src: 'bower_components/jquery/dist/jquery.min.js',
        dest: 'dist/libs/jquery/jquery.min.js'
      },
      {
        expand: true,
        cwd: 'bower_components/bootstrap-material-design/dist/',
        src: [
          'js/material.min.js',
          'js/ripples.min.js',
          'css/material.min.css',
          //!!'css/material-fullpalette.min.css',
          'css/ripples.min.css',
          'css/roboto.min.css',
          'fonts/*'
        ],
        dest: 'dist/libs/bootstrap-material-design/',
        filter: 'isFile'
      }
    ]
  }
};
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
          'angular.min.js'
        ],
        dest: 'dist/libs/angular/',
        filter: 'isFile'
      },
      {
        expand: true,
        cwd: 'bower_components/angular-animate/',
        src: [
          'angular-animate.min.js'
        ],
        dest: 'dist/libs/angular-animate/',
        filter: 'isFile'
      },
      {
        expand: true,
        cwd: 'bower_components/angular-resource/',
        src: [
          'angular-resource.min.js'
        ],
        dest: 'dist/libs/angular-resource/',
        filter: 'isFile'
      },
      {
        expand: true,
        cwd: 'bower_components/angular-aria/',
        src: [
          'angular-aria.min.js'
        ],
        dest: 'dist/libs/angular-aria/',
        filter: 'isFile'
      },
      {
        expand: true,
        cwd: 'bower_components/angular-material/',
        src: [
          'angular-material.min.js',
          'angular-material.min.css'
        ],
        dest: 'dist/libs/angular-material/',
        filter: 'isFile'
      }
    ]
  }
};
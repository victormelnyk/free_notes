module.exports = {

  options: {
    spawn: false,
    livereload: true
  },

  scripts: {
    files: [
      'src/**/*.js'
    ],
    tasks: [
      'newer:jshint',
      'newer:jscs',
      'newer:copy:dev'
    ]
  },

  styles: {
    files: [
      'src/**/*.less'
    ],
    tasks: [
      'newer:less:dev'
    ]
  },

  html: {
    files: [
      'src/index.tpl.html'
    ],
    tasks: [
      'includeSource'
    ]
  },

  htmlApp: {
    files: [
      'src/*/**/*.html'
    ],
    tasks: [
      'newer:copy:all'
    ]
  }
};
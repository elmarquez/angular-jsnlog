module.exports = {
  dist: {
    cwd: '<%= yeoman.app %>/',
    src: [ '**/*', '!sass/**/*' ],
    dest: '<%= yeoman.dist %>/examples',
    expand: true
  },
  lib: {
    src: '<%= yeoman.app %>/scripts/services/angular-jsnlog.js',
    dest: '<%= yeoman.dist %>/angular-jsnlog.js',
    expand: false
  },
  vendor: {
    cwd: 'vendor',
    src: [ '**/*', '!**/src/**/*', '!**/test/**/*' ],
    dest: '<%= yeoman.dist %>/examples/vendor',
    expand: true
  }
};

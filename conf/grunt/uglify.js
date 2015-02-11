module.exports = {
  dist: {
    files: {
      '<%= yeoman.dist %>/angular-jsnlog.min.js': [
        '<%= yeoman.app %>/scripts/services/angular-jsnlog.js'
      ]
    }
  },
  options: {
    banner: '/* Compiled <%= grunt.template.today("yyyy-mm-dd hh:mm:ss") %> */\n',
    sourceMap: true
  }
};

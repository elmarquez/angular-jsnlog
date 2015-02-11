module.exports = {
  options: {
    jshintrc: 'conf/.jshintrc',
    reporter: require('jshint-stylish')
  },
  src: {
    src: [
      'Gruntfile.js',
      'src/**/*.js'
    ]
  },
  test: {
    options: {
      jshintrc: '.jshintrc'
    },
    src: ['test/spec/{,*/}*.js']
  }
};

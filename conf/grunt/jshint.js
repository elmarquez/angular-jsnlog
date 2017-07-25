module.exports = {
  options: {
    jshintrc: 'conf/jshint.json',
    reporter: require('jshint-stylish')
  },
  src: {
    src: ['Gruntfile.js', 'src/**/*.js']
  },
  test: {
    src: ['test/spec/{,*/}*.js']
  }
};

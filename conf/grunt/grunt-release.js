module.exports = function (grunt) {
  grunt.registerTask('release', 'Release new tagged version', ['compile', 'bump']);
};

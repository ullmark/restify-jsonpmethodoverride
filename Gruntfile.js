/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        "curly": true,
        "eqeqeq": true,
        "immed": true,
        "latedef": true,
        "newcap": true,
        "noarg": true,
        "sub": true,
        "undef": true,
        "unused": true,
        "boss": true,
        "eqnull": true,
        "browser": true,
        "globals": {
          "module": true,
          "mocha": true,
          "describe": true,
          "it": true,
          "expect": true,
        }
      },

      lib: {
        src: ['lib/**/*.js']
      },
      gruntfile: {
        src: ['Gruntfile.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['jshint']);
};
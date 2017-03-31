module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - <%= pkg.version %> */\n'
      },
      build: {
        src: 'src/fs-jquery-plugin.js',
        dest: 'dist/fs-jquery-plugin.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('build', ['uglify']);

};
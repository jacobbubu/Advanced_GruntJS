module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'gruntfile.js',
        dest: 'dist/gruntfile.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  // You need to do 'npm install grunt-contrib-uglify --save-dev' first
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
};
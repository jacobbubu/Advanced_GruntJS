module.exports = function(grunt) {

  grunt.config.init({
    base64: {
      // main: {
      //   files: {
      //     'dist/1-2.b64': ['files/{1..2}.txt'],
      //     'dist/3.b64': ['files/3.txt']
      //   }
      // }
      static_mappings: {
        files: [
          { src: ['files/{1..2}.txt'], dest: 'dist/1-2.b64'}
        , { src: ['files/3.txt'], dest: 'dist/3.b64'}
        ]
      },
      dynamic_mappings: {
        files: [
          {
            expand: true
          , cwd: 'files/'
          , src: ['*.txt']
          , dest: 'dist/'
          , ext: '.b64'
          }
        ]
      }
    }
  });

  grunt.registerMultiTask('base64', 'Base64 encode files.', function() {

    this.files.forEach(function(mapping) {
      var contents = mapping.src.filter(function(filepath) {
        // Remove nonexistent files (it's up to you to filter or warn here).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read and return the file's source.
        return grunt.file.read(filepath);
      }).join('');

      grunt.file.write(mapping.dest, (new Buffer(contents)).toString('base64'));

      grunt.log.writeln('File "' + mapping.dest + '" created.');
    });
  });
};
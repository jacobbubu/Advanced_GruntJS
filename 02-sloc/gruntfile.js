// Code snippet from https://github.com/rhiokim/grunt-sloc/blob/master/tasks/sloc.js

var fs = require('fs');
var path = require('path');
var sloc = require('sloc');

function resetCounter() {
  return {
    loc: 0, sloc: 0, cloc: 0, scloc: 0, mcloc: 0, nloc: 0, file: 0
  };
}

module.exports = function(grunt) {

  grunt.config.init({
    sloc: {
      options: {
        reportType: 'stdout',
        jsonSpace: '..'
      },
      all: {
        src: 'files/**'
      },
      js: {
        options: {
          reportType: 'json'
        },
        src: 'files/**/*.js'
      },
      coffee: {
        src: 'files/**/*.coffee'
      }
    }
  });

  grunt.registerMultiTask('sloc', 'Source lines of code', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      reportType: 'stdout',  //stdout, json
      jsonSpace: '  '
    });

    var exts = [ '.js', '.cc', '.c', '.coffeescript', '.coffee', '.python', '.py', '.java', 'php' ];

    var count = resetCounter();
    grunt.verbose.writeflags(options, 'Options');

    this.filesSrc.forEach(function(filepath) {

      if (!grunt.file.exists(filepath)) { return; }

      var ext = path.extname(filepath);
      if (exts.indexOf(ext) < 0) { return; }

      var source = grunt.file.read(filepath, {encoding: 'utf8'});
      var stats = sloc(source, ext.substr(1, ext.length));

      count.loc += stats.loc;
      count.sloc += stats.sloc;
      count.cloc += stats.cloc;
      count.scloc += stats.scloc;
      count.mcloc += stats.mcloc;
      count.nloc += stats.nloc;

      count.file ++;
    });

    if(options.reportType === 'stdout') {
      grunt.log.writeln('-------------------------------');
      grunt.log.writeln('        physical lines : '+ String(count.loc).green);
      grunt.log.writeln('  lines of source code : '+ String(count.sloc).green);
      grunt.log.writeln('         total comment : '+ String(count.cloc).cyan);
      grunt.log.writeln('            singleline : '+ String(count.scloc));
      grunt.log.writeln('             multiline : '+ String(count.mcloc));
      grunt.log.writeln('                 empty : '+ String(count.nloc).red);
      grunt.log.writeln('');
      grunt.log.writeln('  number of files read : '+ String(count.file).green);
      grunt.log.writeln('-------------------------------');
    } else if (options.reportType === 'json') {
      grunt.log.writeln(JSON.stringify(count, null, options.jsonSpace));
    }
    grunt.log.ok();
  });

};

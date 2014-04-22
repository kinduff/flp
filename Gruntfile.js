module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    bookmarklet: {
      generate: {
        body: 'facespac.es.livepreview.js',
        out: 'bookmarklet.js',
        amdify: false,
        jshint: true,
        timestamp: true
      }
    },
    copy: {
      all_files: {
        expand: true,
        cwd: 'landing',
        src: '**',
        dest: 'public'
      }
    },
    replace: {
      index_bookmark: {
        src: 'public/index.html',
        overwrite: true,
        replacements: [{
          from: /\{\{bookmark\}\}/,
          to: "<%= grunt.file.read('bookmarklet.js') %>"
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-bookmarklet-thingy');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-text-replace');

  // Default task.
  grunt.registerTask('default', ['bookmarklet', 'copy', 'replace']);

};

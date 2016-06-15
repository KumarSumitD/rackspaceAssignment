module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.initConfig({
    shell: {
      killNode: {
        options: { failOnError: false},
        command: 'pkill -f node'
      }
    },
    nodemon: {
      startNode: {
        options: {
          file: 'app.js',
          watchedFolders: ['app','app.js']
        }
      }
    }
  });

  //- Default task
  grunt.registerTask('default', function(){
    console.log('Hi! Use grunt startServer to start the node server');
  });

  //- Default task
  grunt.registerTask('startServer', ['shell:killNode', 'nodemon:startNode']);

}
module.exports = function( grunt ){
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  var config = {
    pkg: grunt.file.readJSON('package.json')

  , watch: {
      jshint: {
        // Concat jshint.all
        files: [],
        tasks: ['jshint'],
        options: {
          spawn: false,
        }
      }
    }

  , jshint: {
      // define the files to lint
      all: ['*.js', 'src/*.js'],
      options: {
        ignores: ['node_modules', 'public/jam/**', 'public/bower_components/**', 'public/js/*.js'],
        laxcomma: true,
        sub: true,
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    }
  };

  config.watch.jshint.files = config.watch.jshint.files.concat(
    config.jshint.all
  );

  grunt.initConfig( config );

  grunt.registerTask( 'default', [
    'jshint'
  ]);
};
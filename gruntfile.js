module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-dojo')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-processhtml')

  grunt.initConfig({
    clean: {
      build: {
        src: ['dist/']
      },
      uncompressed: {
        src: [
          'dist/**/*.uncompressed.js'
        ]
      }
    },
    dojo: {
      dist: {
        options: {
          releaseDir: '../dist'
        }
      },
      options: {
        profile: 'build.profile.js',
        dojo: 'src/dojo/dojo.js',
        load: 'build',
        basePath: './src'
      }
    },
    processhtml: {
      options: {},
      main: {
        files: {
          'dist/index.html': ['src/index.html']
        }
      }
    }
  })

  grunt.registerTask('build', ['clean:build', 'processhtml', 'dojo', 'clean:uncompressed'])
}

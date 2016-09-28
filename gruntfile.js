var swPrecache = require('sw-precache')
var path = require('path')
var packageJson = require('./package.json')

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-dojo')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-processhtml')

  grunt.initConfig({
    clean: {
      build: {
        src: ['dist/']
      },
      uncompressed: {
        src: [
          'dist/**/*.uncompressed.js',
          'dist/**/*.js.map'
        ]
      }
    },
    copy: {
      main: {
        expand: true,
        src: 'src/service-worker-registration.js',
        dest: 'dist/service-worker-registration.js'
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
    },
    swPrecache: {
      dev: {
        handleFetch: true,
        rootDir: 'dist'
      }
    }
  })

  grunt.registerTask('build', ['clean:build', 'copy', 'processhtml', 'dojo', 'clean:uncompressed', 'swPrecache'])

  grunt.registerTask('travis', ['build'])

  function writeServiceWorkerFile (rootDir, handleFetch, cb) {
    debugger
    var config = {
      cacheId: packageJson.name,
      handleFetch: handleFetch,
      logger: grunt.log.writeIn,
      staticFileGlobs: [
        rootDir + '/**.html',
        rootDir + '/dojo/dojo.js',
        rootDir + '/app/css/app.css',
        rootDir + '/app/images/**.*',
        rootDir + '/cmv/dijit/**/*.css',
        rootDir + '/cmv/dijit/**/*.png'
      ],
      stripPrefix: rootDir + '/',
      verbose: true
    }

    swPrecache.write(path.join(rootDir, 'service-worker.js'), config, cb)
  }

  grunt.registerMultiTask('swPrecache', function () {
    var done = this.async()
    var rootDir = this.data.rootDir
    var handleFetch = this.data.handleFetch

    writeServiceWorkerFile(rootDir, handleFetch, function (err) {
      if (err) {
        grunt.fail.warn(err)
      }
      done()
    })
  })
}

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
          'dist/**/*.uncompressed.js'
        ]
      }
    },
    copy: {
      main: {
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

  grunt.registerTask('build', ['clean:build', 'copy', 'processhtml', 'dojo', 'swPrecache'])

  grunt.registerTask('travis', ['build'])

  function writeServiceWorkerFile (rootDir, handleFetch, cb) {
    var config = {
      cacheId: packageJson.name,
      handleFetch: handleFetch,
      logger: grunt.log.writeIn,
      staticFileGlobs: [
        // root html
        rootDir + '/*.html',
        // html templates
        rootDir + '/app/**/*.html',
        // dojo script
        rootDir + '/dojo/dojo.js',
        // CSS
        rootDir + '/app/**/*.css',
        // images
        rootDir + '/app/images/*.+(gif|png|jpg)',
        rootDir + 'cmv/**/images/*.+(gif|png|jpg)'
      ],
      stripPrefix: rootDir + '/',
      runtimeCaching: [{
        urlPattern: /Aerials_2013\/MapServer\/tile\/0/,
        handler: 'fastest'
      }, {
        urlPattern: /f=json/,
        handler: 'fastest'
      }],
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

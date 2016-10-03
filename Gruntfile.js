module.exports = function(grunt) {
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  var pkg = grunt.file.readJSON('package.json');
  var globalSettings = grunt.file.readJSON('settings.json');

  grunt.initConfig({
    pkg: pkg,
    shell: {

    },

    connect: {
      server: {
        options: {
          port: 9001,
          base: 'dist',
          // keepalive: true
        }
      }
    },

    sass: {
      options: {
        outputStyle: 'nested',
        imagePath: 'src/images',
        precision: 5,
        includePaths: [
          'components'
        ]
      },
      dev: {
        files: {
          'dist/styles/main.css': 'src/sass/main.scss',
          'dist/styles/styleguide.css': 'src/sass/styleguide/styleguide.scss'
        }
      }
    },

    pixrem: {
      dist: {
        options: {
          replace: false
        },
        src: 'dist/styles/main.css',
        dest: 'dist/styles/main.css'
      }
    },

    uglify: {
      dev: {
        options: {
          beautify: true,
          mangle: false,
          compress: false
        },
        files: {
          'dist/scripts/script.min.js': [
            // Include:
            'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
            'node_modules/mmx-bootstrap-extensions/src/scripts/bootstrap-extensions/inputfile.js',
            'src/scripts/vendor/*.js',
            'src/scripts/enhancers/*.js',
            'src/scripts/handlers/*.js',
            'src/scripts/*.js'
          ],
          'dist/scripts/modernizr.min.js': 'src/scripts/vendor/modernizr.min.js',
          'dist/scripts/styleguide.min.js': [
            'src/scripts/styleguide/clipboard.min.js',
            'src/scripts/styleguide/moment.js',
            'src/scripts/styleguide/js.cookie.js',
            'src/scripts/styleguide/styleguide.js'
          ]
        }
      }
    },

    imagemin: { // Task
      dynamic: { // Another target
        files: [{
          expand: true, // Enable dynamic expansion
          cwd: 'src/images/', // cwd is 'current working directory' - Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
          dest: 'dist/images/' // Destination path prefix
        }]
      }
    },

    jade: {
      compile: {
        options: {
          data: {
            debug: true,
            // these are global project settings passed to the views
            settings: globalSettings
          }
        },
        files: [{
          expand: true, // setting to true enables the following options
          cwd: 'src/jade', // src matches are relative to this path
          //src: [',*.jade'],
          src: ['*.jade'], // matches *.jade in cwd and 1 level down
          dest: 'dist', // destination prefix
          ext: '.html' // replace existing extensions with this value
        }]
      }
    },

    copyFiles: '**/*.{eot,svg,ttf,woff,pdf}',
    copy: {
      target: {
        files: [
          // includes files within path
          {
            expand: true,
            cwd: 'src/',
            src: ['<%= copyFiles %>'],
            dest: 'dist/',
            filter: 'isFile'
          }
        ]
      }

    },

    // Will Automatically insert the correct prefixes for CSS properties. Just write plain CSS.
    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 9']
      },
      prod: {
        src: 'dist/**/*.css'
      },
      dev: {
        src: 'dist/**/*.css'
      },
    },

    // Watch options: what tasks to run when changes to files are saved
    watch: {
      grunt: { files: ['Gruntfile.js'] },
      settings: {
        files: ['settings.json'],
        task: ['dev']
      },
      // options: {},
      css: {
        files: ['src/sass/**/*.scss'],
        tasks: ['css'] // Compile with Compass when Sass changes are saved
      },
      js: {
        files: ['src/scripts/**/*.js'], // Watch for changes in JS files
        tasks: ['javascript']
      },
      jade: {
        files: ['src/jade/**/*.jade'], // Watch for changes in JS files
        tasks: ['jade', 'validation']
      },
      // html: {
      //   options: {
      //       spawn: false
      //   }
      // },
      images: {
        files: ['src/**/*.{png,jpg,gif}'],
        tasks: ['images']
      },
      copy: {
        files: ['src/**/<%= copyFiles %>'],
        tasks: ['copy']
      },
      livereload: {
        // Here we watch the files the sass task will compile to
        // These files are sent to the live reload server after sass compiles to them
        options: { livereload: true },
        files: ['dist/**/*'],
        port: 1337
      },
    },

    //HTML validation
    validation: {
      options: {
        reset: grunt.option('reset') || false,
        stoponerror: false,
        generateReport: true,
        errorHTMLRootDir: 'reports',
        reportpath: 'reports/validation-report.json',
        path: 'reports/validation-status.json'
      },
      files: {
          src: ['dist/*.html'],
          tasks: ['validation']
      }
    },

    //JavaScript validation
    jshint: {
      options: {
        reporter: require('jshint-html-reporter'),
        reporterOutput: 'reports/js/jshint-report.html',
        force: false, //If set to true it will report errors but not fail the task
        ignores: ['src/scripts/vendor/*.js', 'src/scripts/styleguide/*.min.js'],
        globals: {
          jQuery: true
        }
      },
      ignore_warning: {
        options: {
          //Here we can specify which errors or warnings to ignore. e.g "'-W015': true"
        }
      },
      target: ['src/scripts/*.js']
    }
  });

  /**
   * CSS tasks
   */
  grunt.registerTask('css', [
    'sass',
    'autoprefixer:dev',
    'pixrem'
  ]);

  /**
   * HTML tasks
   */
  grunt.registerTask('html', [
    'jade'
  ]);

  /**
   * JavaScript tasks
   */
  grunt.registerTask('javascript', [
    'jshint',
    'uglify:dev'
  ]);

  /**
   * Images tasks
   */
  grunt.registerTask('images', [
    'imagemin'
  ]);

  /**
   * Dev task
   */
  grunt.registerTask('dev', [
    'css',
    'html',
    'javascript',
    'images',
    'copy',
  ]);

  /**
   * Default Tasks
   */
  grunt.registerTask('serve', ['connect', 'dev', 'watch']);

  // Generate variable files when settings is changed
  grunt.event.on('watch', function(action, filepath, target) {
    if(filepath === 'settings.json') {
      globalSettings = grunt.file.readJSON('settings.json');

      // Generate colors

      var content = '// Colors\n\r// Auto generated at ' + (new Date()).toLocaleString() + '\n\n';

      content += globalSettings.colors.map(function(clr) {
        return '$' + clr.name + ':\t\t\t' + clr.color + '; // ' + clr.displayName + '\n';
      }).join('');

      grunt.file.write('src/sass/_application-colors.scss', content);
      grunt.log.writeln('_application-colors.scss generated');

      // Generate margins

      content = '// Margins\n\r// Auto generated at ' + (new Date()).toLocaleString() + '\n\n';

      content += globalSettings.margins.map(function(mrgn) {
        return '$margin-' + mrgn.name + ':\t\t\t' + mrgn.margin + '; // ' + mrgn.displayName + '\n';
      }).join('');

      grunt.file.write('src/sass/_application-margins.scss', content);
      grunt.log.writeln('_application-margins.scss generated');
    }

  });

};

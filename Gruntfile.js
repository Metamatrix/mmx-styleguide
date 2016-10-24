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

    dirs: {
      output: 'dev'
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
      },
      dist: {
        files: {
          'dist/styles/main.css': 'src/sass/main.scss',
          'dist/styles/styleguide.css': 'src/sass/styleguide/styleguide.scss'
        },
        options: {
          outputStyle: 'compressed'
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
      dist: {
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
            'dist/scripts/styleguide.min.js': [
            'src/scripts/styleguide/clipboard.min.js',
            'src/scripts/styleguide/moment.js',
            'src/scripts/styleguide/js.cookie.js',
            'src/scripts/styleguide/styleguide.js'
          ]
        }
      },
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

    pug: {
      options: {
        data: {
        debug: true,
        // these are global project settings passed to the views
        settings: globalSettings
        }
      },
      dist: {
        files: [{
          expand: true, // setting to true enables the following options
          cwd: 'src/pug', // src matches are relative to this path
          //src: [',*.pug'],
          src: ['*.pug'], // matches *.pug in cwd and 1 level down
          dest: 'dist', // destination prefix
          ext: '.html' // replace existing extensions with this value
        }]
      },
      dev: {
        options: {
          pretty: true
        },
        files: [{
          expand: true, // setting to true enables the following options
          cwd: 'src/pug', // src matches are relative to this path
          //src: [',*.pug'],
          src: ['*.pug'], // matches *.pug in cwd and 1 level down
          dest: 'dist', // destination prefix
          ext: '.html' // replace existing extensions with this value
        }]
      }
    },
    exportDest: 'export',
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
      },
      //file export
      export:{
        files:[
        {
          expand: true,
          cwd: 'src/sass',
          src: '**/*.scss',
          dest: '<%= exportDest %>/static/styles'
        },
        {
          expand: true,
          cwd: 'src/scripts',
          src: '**/*.js',
          dest: '<%= exportDest %>/static/scripts'
        },
        {
          expand: true,
          cwd: 'src/images',
          src: '**/*',
          dest: '<%= exportDest %>/static/images'
        },
        {
          expand: true,
          cwd: 'src/fonts',
          src: '**/*',
          dest: '<%= exportDest %>/static/fonts'
        },
        {
          expand: true,
          cwd: 'node_modules/bootstrap-sass/assets/stylesheets',
          src: '**/*.scss',
          dest: '<%= exportDest %>/static/styles/bootstrap'
        },
        {
          expand: true,
          cwd: 'node_modules/bootstrap-sass/assets/javascripts',
          src: '**/*.js',
          dest: '<%= exportDest %>/static/scripts/bootstrap'
        },
        {
          expand: true,
          cwd: 'node_modules/mmx-bootstrap-extensions/src/styles',
          src: '**/*.scss',
          dest: '<%= exportDest %>/static/styles/bootstrap-extensions'
        },
        {
          expand: true,
          cwd: 'node_modules/mmx-bootstrap-extensions/src/scripts',
          src: '**/*.js',
          dest: '<%= exportDest %>/static/scripts/bootstrap-extensions'
        }]
      }

    },

    // Will Automatically insert the correct prefixes for CSS properties. Just write plain CSS.
    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 9']
      },
      dist: {
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
        tasks: ['css-<%= dirs.output %>'] // Compile with Compass when Sass changes are saved
      },
      js: {
        files: ['src/scripts/**/*.js'], // Watch for changes in JS files
        tasks: ['javascript-<%= dirs.output %>']
      },
      pug: {
        files: ['src/pug/**/*.pug'], // Watch for changes in JS files
        tasks: ['html-<%= dirs.output %>']
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
        tasks: ['copy:target']
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
        reportpath: 'reports/html/validation-report.json',
        path: 'reports/html/validation-status.json'
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
        undef: true, //enable warnings about undefined variables
        unused: true, //enable warnings about unused variables
        bitwise: true, //prohibits the use of bitwise operators such as "|", as they are often mistyped.
        curly: true, //requires you to always put curly braces around blocks in loops & conditionals
        eqeqeq: true, //prohibits the use of == and != instead of === and !==
        esversion: 5, //specifies ES version to which the code must adhere. 3 = program needs to be executable in older browsers.
        latedef: true, //prohibits the use of a variable before it was defined.
        futurehostile: true, //enables warnings about the use of identifiers which are defined in future versions of JS.
        freeze: true, //prohibits overwriting prototypes of native objects such as Array, Date and so on.
        nonbsp: true, //warns about "non-breaking whitespace" characters that have a potential of breaking non-UTF8 web pages.
        globals: {
          jQuery: true,
          $: true,
          window: true,
          document: true
        }
      },
      ignore_warning: {
        options: {
          //Here we can specify which errors or warnings to ignore. e.g "'-W015': true"
        }
      },
      target: ['src/scripts/*.js']
    },

    //Accessibility test - output to terminal
 /* a11y: {
      dev: {
        options: {
          urls: ['dist/*.html']
        }
      }
    },*/

    //Accessibility test - execute command for generating report. (for this to work: npm install --global a11y)
    exec: {
        command: 'a11y dist/*.html > reports/html/accessibility-audit.txt'
    },

    //Modernizr configuration
    modernizr: {
      dist: {
        crawl: false,
        customTests: [],
        dest: 'dist/scripts/modernizr.min.js',
        tests:[
          "touchevents",
          "backgroundsize",
          "boxshadow",
          "csscolumns",
          "flexbox",
          "cssgradients",
          "csspointerevents",
          "cssremunit",
          "rgba",
          "textshadow",
          "csstransforms",
          "csstransitions",
          "localstorage",
          "inlinesvg"
        ],
        options: ["mq", "setClasses"],
        uglify: true
      }
    },

  });

  /**
   * CSS tasks
   */
  grunt.registerTask('css-dev', [
    'sass:dev',
    'autoprefixer:dev',
  ]);

  grunt.registerTask('css-dist', [
    'sass:dist',
    'autoprefixer:dist',
    'pixrem'
  ]);

  /**
   * HTML tasks
   */
  grunt.registerTask('html-dev', [
    'pug:dev'
  ]);

  grunt.registerTask('html-dist', [
    'pug:dist'
  ]);

  grunt.registerTask('html-dev-validate', [
    'pug:dev',
    'validation',
    'exec'
  ]);

  grunt.registerTask('html-dist-validate', [
    'pug:dist',
    'validation',
    'exec'
  ]);

  /**
   * JavaScript tasks
   */
  grunt.registerTask('javascript-dev', [
    'uglify:dev'
  ]);

  grunt.registerTask('javascript-dist', [
    'uglify:dist'
  ]);

  grunt.registerTask('javascript-dev-validate', [
    'uglify:dev',
    'jshint'
  ]);

  grunt.registerTask('javascript-dist-validate', [
    'uglify:dist',
    'jshint'
  ]);

  /**
   * Images tasks
   */
  grunt.registerTask('images', [
    'imagemin'
  ]);

  /**
   * Export files task
   */
  grunt.registerTask('exportfiles', [
    'copy:export'
  ]);

  /**
   * Dev task
   */
  grunt.registerTask('dev', [
    'css-dev',
    'html-dev',
    'javascript-dev',
    'copy:target',
    'modernizr'
  ]);

  /**
 * Dist task
 */
  grunt.registerTask('dist', [
    'css-dist',
    'html-dist',
    'javascript-dist',
    'images',
    'copy:target',
    'modernizr'
  ]);

  /**
 * Validation task
 */
  grunt.registerTask('validate', [
    'validation',
    'exec',
    'jshint'
  ]);

  /**
   * Default Tasks
   */
  //grunt.registerTask('serve', ['connect', 'dev', 'watch']);

  grunt.registerTask('serve', 'Run tasks', function(task1, task2) {
    if (arguments.length === 0) {
        grunt.task.run('connect', 'dev', 'watch');
    }
    else if (task2 == undefined){
        grunt.config.set('dirs.output', task1);
        grunt.task.run('connect', task1, 'watch');
    }
    else {
        grunt.config.set('dirs.output', task1 + '-' + task2);
        grunt.task.run('connect', task1, task2, 'watch');
    }
  });

  /**
   * Export task
   */
  grunt.registerTask('export', 'export files', function(exportdir){
    if(arguments.length === 0){
      grunt.task.run('exportfiles');
    }
    else {
      grunt.config.set('exportDest', exportdir);
      grunt.task.run('exportfiles');
    }
  });

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

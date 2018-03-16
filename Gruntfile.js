
module.exports = function(grunt) {
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  var pkg = grunt.file.readJSON('package.json');
  var globalSettings = grunt.file.readJSON('settings.json');

  var options = {
    config: {
      src: "grunt/*.js"
    },
    shell: {

    },
    dirs: {
      output: 'dev'
    },
    pkg: pkg,
    globalSettings: globalSettings,
    exportDest: 'export',
    copyFiles: '**/*.{eot,ttf,woff,woff2,pdf,svg}'
  };

  var configs = require('load-grunt-configs')(grunt, options);
  grunt.initConfig(configs);

  /**
   * CSS tasks
   */
  grunt.registerTask('css-dev', [
    'sass:dev',
    'autoprefixer:dev'
  ]);

  grunt.registerTask('css-dist', [
    'sass:dist',
    'autoprefixer:dist'
  ]);

  /**
   * HTML tasks
   */
  grunt.registerTask('html-dev', [
    //'pug:dev',
    'nunjucks'
  ]);

  grunt.registerTask('html-dist', [
    //'pug:dist'
    'nunjucks'
  ]);

  grunt.registerTask('html-dev-validate', [
    'nunjucks',
    'validation',
    'shell'
  ]);

  grunt.registerTask('html-dist-validate', [
    //'pug:dist',
    'nunjucks',
    'validation',
    'shell'
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
    'autoGenerateFiles',
    'svgPlaceholder',
    'css-dev',
    'html-dev',
    'javascript-dev',
    'images',
    'copy:target',
    'modernizr'
  ]);

  /**
 * Dist task
 */
  grunt.registerTask('dist', [
    'autoGenerateFiles',
    'svgPlaceholder',
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
    'jshint',
    'shell'
  ]);

  /**
   * Default Tasks
   */
  //grunt.registerTask('serve', ['connect', 'dev', 'watch']);

  grunt.registerTask('serve', 'Run tasks', function(task1, task2) {
    if (arguments.length === 0) {
        grunt.task.run('connect', 'dev', 'copy:target', 'watch');
    }
    else if (task2 === undefined){
        grunt.config.set('dirs.output', task1);
        grunt.task.run('connect', task1, 'copy:target', 'watch');
    }
    else {
        grunt.config.set('dirs.output', task1 + '-' + task2);
        grunt.task.run('connect', task1, task2, 'copy:target', 'watch');
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

  /**
   * Visual regression test
   */
   grunt.registerTask('backstop', 'visual regression test', function(task){
    if(arguments.length === 0){
      grunt.task.run('backstopjs:test');
    }
    else {
      grunt.task.run('backstopjs:' + task);
    }
   });

  /**
  * Load tasks from external files
  */
  grunt.task.loadTasks('grunt/tasks');

};

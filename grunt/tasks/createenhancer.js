'use strict';

module.exports = function(grunt) {

  function makeTitle(text) {
    return text.substring(0,1).toUpperCase() + text.substring(1);
  }

  /**
  * Generate enhancer files from settings
  */
  grunt.task.registerTask('enhancer', 'Creates a new component', function(name) {
    
    if(!name) {
      grunt.log.error('Error no component name. Use like so: "grunt component:name-of-component"');
      return;
    }



    var formatedName = name.split(/[-_\.\s]/)
      .map(function(value, index) { 
        if(!value || value.length === 0)
          return '';

        if(value.length === 1)
          return value.toUpperCase();

        if(index === 0)
          return value;

        return makeTitle(value);
      })
      .join('');

    grunt.log.writeln('Createing enhancer ' + name + '...');

    var enhacerTemplate = '(function ($) {\n\n\t"use strict";\n\n\t$.enhancer("' + formatedName + '", function () {\n\n\t// Add logic here\n\n\t});\n\n})(jQuery);';
    grunt.file.write('src/scripts/enhancers/' + name + '.js', enhacerTemplate);
    
    grunt.log.writeln('Enhancer ' + name + ' generated!');

  });
};
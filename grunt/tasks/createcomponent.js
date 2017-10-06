'use strict';

module.exports = function(grunt) {

  function makeTitle(text) {
    return text.substring(0,1).toUpperCase() + text.substring(1);
  }

  function create(type, name, enhancer) {
    
    var pathName = type + 's',
      styleFilePath = 'src/sass/application/_' + name + '.scss',
      viewFilePath = 'src/nunjucks/' + pathName + '/' + name + '.njk',
      formatedName = name.split(/[-_\.\s]/)
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

    console.log(formatedName);

    // Stop if the files exists
    if(grunt.file.exists(styleFilePath) || grunt.file.exists(viewFilePath)) {
      grunt.log.error('Error creating ' + type + ' ' + name + '. There is already a file with that name.');
      return;
    }

    grunt.log.writeln('Creating ' + type + ' ' + name);

    // generate style

    var content = '// ' + makeTitle(name) + '\n.' + name + '{\n\n\n' + '}';
    grunt.file.write(styleFilePath, content);

    // update application file

    var scssApplication = grunt.file.read('src/sass/_application.scss'),
      textToInsert = '@import "application/' + name + '";';

    if(scssApplication.indexOf(textToInsert) === -1) {
      scssApplication += '\n' + textToInsert;
      grunt.file.write('src/sass/_application.scss', scssApplication);
    }
    
    // generate view

    content = '{# ' + makeTitle(name) + ' #}\n\n';
    content += '<div class="' + name + '"';
    if(enhancer) {
      content += ' data-enhancer="' + formatedName + '"';
    }
    content += '>\n</div>';

    grunt.file.write(viewFilePath, content);

    // update styleguide index file

    var rx = new RegExp('docsheading\\("' + makeTitle(type + 's') + '"\\)\\s+}}([\\s\\S]*?)<\\/section>', 'g'),
      styleguideIndex = grunt.file.read('src/nunjucks/index.njk'),
      matches = rx.exec(styleguideIndex);

    if(matches && matches.length) {
      var text = matches[1],
        textToInsert = '{{ docsection("' + makeTitle(name) + '", "../' + pathName + '/' + name +  '.njk") }}';

      if(text.indexOf(textToInsert) === -1) {
        var replacementText = text + '\n\t\t' + textToInsert + '\n';
        grunt.file.write('src/nunjucks/index.njk', styleguideIndex.replace(text, replacementText));
      }
      
    }

    // create enhancer

    if(enhancer) {
      grunt.task.run('enhancer:' + name);
    }

    grunt.log.writeln(makeTitle(type) + ' ' + name + ' generated!');

  }

  /**
  * Generate component files from settings
  */
  grunt.task.registerTask('component', 'Creates a new component', function(name, enhancer) {
    
    if(!name) {
      grunt.log.error('Error no component name. Use like so: "grunt component:name-of-component"');
      return;
    }

    create('component', name, enhancer)

  });

  /**
  * Generate composition files from settings
  */
  grunt.task.registerTask('composition', 'Creates a new composition', function(name, enhancer) {
    
    if(!name) {
      grunt.log.error('Error no composition name. Use like so: "grunt composition:name-of-composition"');
      return;
    }

    create('composition', name, enhancer)

  });
};
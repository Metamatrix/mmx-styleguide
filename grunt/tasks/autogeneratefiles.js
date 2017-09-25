'use strict';

module.exports = function(grunt) {
  /**
  * Generate files from settings
  */
  grunt.task.registerTask('autoGenerateFiles', 'Auto generates files from settings.json', function() {
    
    grunt.log.writeln('Auto generating files...');

    var globalSettings = grunt.file.readJSON('./settings.json');

    // Generate colors

    var content = '// Colors\n\r// Auto generated from settings.json at ' + (new Date()).toLocaleString() + '\n\n';

    content += globalSettings.colors.map(function(clr) {
      return '$' + clr.name + ':\t\t\t' + clr.color + '; // ' + clr.displayName + '\n';
    }).join('');

    grunt.file.write('src/sass/_application-colors.scss', content);
    grunt.log.writeln('_application-colors.scss generated');

    // Generate margins

    content = '// Margins\n\r// Auto generated from settings.json at ' + (new Date()).toLocaleString() + '\n\n';

    content += globalSettings.margins.map(function(mrgn) {
      return '$margin-' + mrgn.name + ':\t\t\t' + mrgn.margin + '; // ' + mrgn.displayName + '\n';
    }).join('');

    grunt.file.write('src/sass/_application-margins.scss', content);

    // Generate paths

    content = '// Paths\n\r// Auto generated from settings.json at ' + (new Date()).toLocaleString() + '\n\n';

    content += '$scripts-path: \'' + globalSettings.scriptsPath + '\';\n';
    content += '$styles-path: \'' + globalSettings.stylesPath + '\';\n';
    content += '$img-path: \'' + globalSettings.imgPath + '\';\n';
    content += '$fonts-path: \'' + globalSettings.fontsPath + '\';\n';

    grunt.file.write('src/sass/_application-paths.scss', content);

    // Generate icons

    content = '// Icons\n\r// Auto generated from settings.json at ' + (new Date()).toLocaleString() + '\n\n';

    content += '.' + globalSettings.icons.className + ' { width: ' + globalSettings.icons.sizes.md + '; height: ' + globalSettings.icons.sizes.md + '; }\n';

    for(var key in globalSettings.icons.sizes) {
      var iconSize = globalSettings.icons.sizes[key];
      content += '.' + globalSettings.icons.prefix + key + ' { width: ' + iconSize + '; height: ' + iconSize + '; }\n';
    }

    for(var key in globalSettings.icons.colors) {
      var iconColor = globalSettings.icons.colors[key];
      content += '.' + globalSettings.icons.prefix + key + ' { fill: ' + iconColor + '; }\n';
    }

    grunt.file.write('src/sass/_application-icons.scss', content);
  
  });
};
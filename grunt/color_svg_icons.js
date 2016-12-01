module.exports = function(grunt, options){
  return {
    svg_options: {
      options: {
        prepend: false,
        colors: '<%= globalSettings.icons.colors %>'
      },
      files: {
        'dist/images/icons':'src/images/icons/*.svg'
      }
    }
  }
};
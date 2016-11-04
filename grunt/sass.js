module.exports = function(grunt, options){
  return {
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
  }
};
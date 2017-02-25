module.exports = function(grunt, options) {
  return {
    dist: {
      files: {
        'dist/scripts/script.min.js': [
          // Include:
          'node_modules/jquery/dist/jquery.js',
          'node_modules/jquery-validation/dist/jquery.validate.js',
          'node_modules/jquery-ajax-unobrusive/jquery.unobtrusive-ajax.js',
          'node_modules/jquery-validation-unobtrusive/jquery.validate.unobtrusive.js',
          'node_modules/fastclick/lib/fastclick.js',
          'node_modules/holderjs/holder.js',
          'node_modules/svg4everybody/dist/svg4everybody.js',
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
          'node_modules/jquery/dist/jquery.js',
          'node_modules/jquery-validation/dist/jquery.validate.js',
          'node_modules/jquery-ajax-unobrusive/jquery.unobtrusive-ajax.js',
          'node_modules/jquery-validation-unobtrusive/jquery.validate.unobtrusive.js',
          'node_modules/fastclick/lib/fastclick.js',
          'node_modules/holderjs/holder.js',
          'node_modules/svg4everybody/dist/svg4everybody.js',
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
  }
};
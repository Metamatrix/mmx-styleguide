module.exports = function(grunt, options){
  // Will Automatically insert the correct prefixes for CSS properties. Just write plain CSS.
  return {
    options: {
      browsers: ['last 2 version', 'ie 9']
    },
    dist: {
      src: 'dist/**/*.css'
    },
    dev: {
      src: 'dist/**/*.css'
    }
  }
};
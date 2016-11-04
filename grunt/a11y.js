module.exports = function(grunt, options){
  //Accessibility test - output to terminal
  return {
    a11y: {
      dev: {
        options: {
          urls: ['dist/*.html']
        }
      }
    }
  }
}
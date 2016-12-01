module.exports = function(grunt, options){
  return {
    dist: {
      options: {
        replace: false
      },
      src: 'dist/styles/main.css',
      dest: 'dist/styles/main.css'
    }
  }
};
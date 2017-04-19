module.exports = function(grunt, options){
  //Accessibility test - output to terminal
  return {
    options: {
      data: grunt.file.readJSON('settings.json')
      
    },
    render: {
      files: [
        {
          expand: true,
          cwd: "src/nunjucks/",
          src: "*.njk",
          dest: "dist/",
          ext: ".html"
        }
      ]
    }
  }
}

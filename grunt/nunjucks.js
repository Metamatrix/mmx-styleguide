module.exports = function(grunt, options){
  //Accessibility test - output to terminal
  return {
    options: {
      data: '<%= globalSettings %>'
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

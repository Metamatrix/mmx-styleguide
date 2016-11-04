module.exports = function(grunt, options){
//Modernizr configuration
  return {
    dist: {
      crawl: false,
      customTests: [],
      dest: 'dist/scripts/modernizr.min.js',
      tests:[
        "touchevents",
        "backgroundsize",
        "boxshadow",
        "csscolumns",
        "flexbox",
        "cssgradients",
        "csspointerevents",
        "cssremunit",
        "rgba",
        "textshadow",
        "csstransforms",
        "csstransitions",
        "localstorage",
        "inlinesvg"
      ],
      options: ["mq", "setClasses"],
      uglify: true
    }
  }
};
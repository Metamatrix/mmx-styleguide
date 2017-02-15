module.exports = function(grunt, options){
// Watch options: what tasks to run when changes to files are saved
  return {
    grunt: { files: ['Gruntfile.js'] },
    settings: {
      files: ['settings.json'],
      task: ['dev']
    },
    // options: {},
    css: {
      files: ['src/sass/**/*.scss'],
      tasks: ['css-<%= dirs.output %>'] // Compile with Compass when Sass changes are saved
    },
    js: {
      files: ['src/scripts/**/*.js'], // Watch for changes in JS files
      tasks: ['javascript-<%= dirs.output %>']
    },
    pug: {
      files: ['src/pug/**/*.pug'], // Watch for changes in JS files
      tasks: ['html-<%= dirs.output %>']
    },
    // html: {
    //   options: {
    //       spawn: false
    //   }
    // },
    images: {
      files: ['src/**/*.{png,jpg,gif,svg}'],
      tasks: ['images']
    },
    copy: {
      files: ['src/**/<%= copyFiles %>'],
      tasks: ['copy:target']
    },
    livereload: {
      // Here we watch the files the sass task will compile to
      // These files are sent to the live reload server after sass compiles to them
      options: { livereload: true },
      files: ['dist/**/*'],
      port: 1337
    },
    icons: {
      files: ['src/images/icons/*.svg'],
      tasks: ['icons']
    }
  }
};
module.exports = function(grunt, options){
  return {
    dynamic: { // Another target
      files: [{
        expand: true, // Enable dynamic expansion
        cwd: 'src/images/', // cwd is 'current working directory' - Src matches are relative to this path
        src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
        dest: 'dist/images/' // Destination path prefix
      }]
    }
  }
};
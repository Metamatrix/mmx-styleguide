module.exports = function(grunt, options){
//HTML validation
  return {
    options: {
      reset: grunt.option('reset') || false,
      stoponerror: false,
      generateReport: true,
      errorHTMLRootDir: 'reports',
      reportpath: 'reports/html/validation-report.json',
      path: 'reports/html/validation-status.json'
    },
    files: {
        src: ['dist/*.html'],
        tasks: ['validation']
    }
  }
};
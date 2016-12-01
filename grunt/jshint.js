module.exports = function(grunt, options){
//JavaScript validation
  return {
    options: {
      reporter: require('jshint-html-reporter'),
      reporterOutput: 'reports/js/jshint-report.html',
      force: false, //If set to true it will report errors but not fail the task
      ignores: ['src/scripts/vendor/*.js', 'src/scripts/styleguide/*.min.js'],
      undef: true, //enable warnings about undefined variables
      unused: true, //enable warnings about unused variables
      bitwise: true, //prohibits the use of bitwise operators such as "|", as they are often mistyped.
      curly: true, //requires you to always put curly braces around blocks in loops & conditionals
      eqeqeq: true, //prohibits the use of == and != instead of === and !==
      esversion: 5, //specifies ES version to which the code must adhere. 3 = program needs to be executable in older browsers.
      latedef: true, //prohibits the use of a variable before it was defined.
      futurehostile: true, //enables warnings about the use of identifiers which are defined in future versions of JS.
      freeze: true, //prohibits overwriting prototypes of native objects such as Array, Date and so on.
      nonbsp: true, //warns about "non-breaking whitespace" characters that have a potential of breaking non-UTF8 web pages.
      globals: {
        jQuery: true,
        $: true,
        window: true,
        document: true
      }
    },
    ignore_warning: {
      options: {
        //Here we can specify which errors or warnings to ignore. e.g "'-W015': true"
      }
    },
    target: ['src/scripts/*.js']
  }
};
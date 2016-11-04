module.exports = function(grunt, options) {
//Accessibility test - execute command for generating report. (for this to work: npm install --global a11y)
  return {
    target: {
      command: 'a11y dist/*.html > reports/html/accessibility-audit.txt'
    }
  }
};
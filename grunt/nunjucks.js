const utils = require("./utils/utils.js");
const lipsum = require("./utils/lipsum.js");

module.exports = function(grunt, options) {

  //Accessibility test - output to terminal
  return {
    options: {
      data: options.globalSettings,
      configureEnvironment: function(env, nunjucks) {
        env.addGlobal('settings', options.globalSettings);
        env.addGlobal('utils', utils);
        env.addGlobal('lipsum', lipsum);
      }
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

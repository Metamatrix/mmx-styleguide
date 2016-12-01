module.exports = function(grunt, options) {
//Visual regression test
  return {
    reference: {
      options: {
        backstop_path: 'node_modules/backstopjs',
        test_path: 'reports/backstop_data/bitmaps_test',
        setup: false, //if true it will copy files in test_path to backstop_path
        configure: false, //if true it will trigger npm install inside backstop_path
        create_references: true, //set to true if you want to create new references
        run_tests: false
      }
    },
    test: {
      options: {
        backstop_path: 'node_modules/backstopjs',
        test_path: 'reports/backstop_data/bitmaps_test',
        setup: false, //if true it will copy files in test_path to backstop_path
        configure: false, //if true it will trigger npm install inside backstop_path
        create_references: false, //set to true if you want to create new references
        run_tests: true
      }
    }
  }
};
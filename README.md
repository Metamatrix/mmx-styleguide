# Metamatrix Styleguide Starter Templates

## Getting started

Dependencies are:
* NodeJS

Other stuff used are:
* SASS (SCSS)
* Pug (Jade)

### Working with this project

* Clone the repository to your computer
* Run command nmp install to install all modules
* Run command grunt serve to start a server on localhost:9001

### Use this as a template for a new project

In order to copy files to a new repository you will need to use the terminal. To do this you need to create ssh-keys bo be able to connect to github. https://help.github.com/articles/generating-an-ssh-key/

1. Create a new repository on Github with a name, for example "my-styleguide"
2. Open a terminal and cd to your local version of the styleguide repository, for example: C:\Repositories\mmx-styleguide
3. Run command to copy all files from the master branch to the master branch of your new repository: git push git@github.com:Metamatrix/my-styleguide.git +master:master
4. Clone the newly created repository to your computer
5. Edit packages.json file and update project name, git repository etc. You can also run the command npm init to do this.
6. Edit settings.json for your project
7. Run command nmp install to install all modules
8. Run command grunt serve to start a server on localhost:9001

### Use grunt task runner for this project

This project uses Grunt as task runner. How to use in the terminal:

* Run command grunt serve to start server and run all specified 'dev' tasks.
* Run command grunt serve:dist to start server and run all specified 'dist' tasks.
* If you add :validate to your command, grunt will also run validation tests (e.g. grunt serve:dev:validate).

#### Visual regression test

In this project you can run BackstopJS to output a visual regression test report. All css selectors and other properties are specified in the config file named backstop.json.

* Run command grunt backstop to run test and see the test report in the browser
* Run command grunt backstop:reference to create a set of reference screenshots based on the selectors specified in the config file. Every time you make changes (intentionally) to a page element you should run this command to update the screenshot references.

Screenshot references, tests and the html report can be found in reports/backstop_data.
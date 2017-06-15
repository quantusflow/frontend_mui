module.exports = function(grunt) {
    "use strict";

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        babel: {
            options: {
                babelrc: true
            },
            dist: {
              files: [{
                  expand: true,
                  cwd: "src",
                  src: ["**/*.js"],
                  dest: "dist",
                  ext: ".js"
              }]
            }
        },
        watch: {
            babel: {
                files: ["src/**/*.js", "src/**/*.scss"],
                tasks: ["babel"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-babel");

    grunt.registerTask("default", [
        "babel"
    ]);

};
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
      pkg: grunt.file.readJSON{"package.json"),

      qunit: {     // task
        master: {  //target
          options: {
            urls: [ "http://localhost:3333/tests/master.html" ]
          }
        }
      },

      connect: {
        server: {
          options: {
            port: 3333,
            hostname: "localhost",
            base: "public"
          }
        }
      }

    });

    grunt.loadNpmTasks("grunt-contrib-qunit");
    grunt.loadNpmTasks("grunt-contrib-connect");

    grunt.registerTask( "tests", [  "connect", "qunit" ]);

    grunt.registerTask( "default", [  "qunit" ]);
};
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    qunit: {
      master: {
        options: {
          urls: [ "http://localhost:3333/tests/master.html" ]
        }
      },
      filter: {
        options: {
          urls: [ "http://localhost:3333/tests/filter.html" ]
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
    },

    watch: {
      html: {
        files: [ "public/*.html" ],
        tasks: [ "dev" ],
        options: { nospawn: true }
      },
      js: {
        files: [ "public/js/app/**/*.js" ],
        tasks: [ "dev" ],
        options: { nospawn: true }
      },
      tests: {
        files: [ "public/tests/**/*.html", "public/js/tests/**/*.js" ],
        tasks: [ "connect", "qunit" ],
        options: { nospawn: true }
      }
    },

    haml: {
      dist: {
        files: {
          "_dist/index.html": "public/index.haml",
          "_dist/tests/master.html": "public/tests/master.haml",
          "_dist/tests/filter.html": "public/tests/filter.haml"
        }
      }
    },

    copy: {
      images: {
        expand: true,
        src: [ "img/**/*.*" ],
        cwd: "public/",
        dest: "_dist/"
      },
      fonts: {
        expand: true,
        src: [ "css/**/*.*" ],
        cwd: "public/",
        dest: "_dist/"
      },
      js: {
        expand: true,
        src: [ "js/**/*.*" ],
        cwd: "public/",
        dest: "_dist/"
      }
    },

    clean: [ "_dist" ],

    jshint: {
      files: ["public/js/app/**/*.js"],
      options: {
        force: true,
        jshintrc: "./.jshintrc"
      }
    }

  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-qunit");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-haml");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask( "test", [ "connect", "qunit" ] );
  grunt.registerTask( "dev", [ "jshint", "test" ] );
  grunt.registerTask( "build", [ "clean", "haml", "copy" ] );

  grunt.registerTask( "default", [ "dev" ]);

};

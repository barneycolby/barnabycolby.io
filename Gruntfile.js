/*global module, require */
(function () {
    'use strict';

    module.exports = function (grunt) {

        require('time-grunt')(grunt);

        grunt.initConfig({

            karma: {
                options: {
                    frameworks: ['jasmine'],
                    exclues: ['**/*.swp'],
                    reporters: ['progress'],
                    port: 9876,
                    colors: true,
                    logLevel: 'INFO',
                    autoWatch: false,
                    browsers: ['PhantomJS'],
                    singleRun: true,
                    plugins: [
                        'karma-jasmine',
                        'karma-phantomjs-launcher',
                        'karma-ng-html2js-preprocessor'
                    ]
                },
                source: {
                    options: {
                        preprocessors: {
                            'source/www/snippets/**/*.html': ['ng-html2js']
                        },
                        files: [
                            'bower_components/jquery/dist/jquery.min.js',
                            'bower_components/angular/angular.min.js',
                            'bower_components/angular-mocks/angular-mocks.js',
                            'source/www/modules/**/*.js',
                            'source/www/snippets/**/*.html',
                            'test/**/*.spec.js'
                        ],
                        ngHtml2JsPreprocessor: {
                            stripPrefix: 'source/www'
                        }
                    }
                },
                production: {
                    options: {
                        preprocessors: {
                            'production/www/snippets/**/*.html': ['ng-html2js']
                        },
                        files: [
                            'bower_components/jquery/dist/jquery.min.js',
                            'bower_components/angular/angular.min.js',
                            'bower_components/angular-mocks/angular-mocks.js',
                            'production/www/js/modules.min.js',
                            'production/www/snippets/**/*.html',
                            'test/**/*.spec.js'
                        ],
                        ngHtml2JsPreprocessor: {
                            stripPrefix: 'production/www'
                        }
                    }
                }
            },

            jslint: {
                gruntfile: ['Gruntfile.js'],
                source: ['source/www/modules/**/*.js'],
                test: ['test/**/*.spec.js']
            },

            clean: ['production'],

            copy: {
                main: {
                    expand: true,
                    cwd: 'source/www',
                    src: ['favicon.ico', 'data/**'],
                    dest: 'production/www'
                }
            },

            uglify: {
                main: {
                    src: 'production/www/js/modules.js',
                    dest: 'production/www/js/modules.min.js'
                }
            },

            less: {
                source: {
                    options: {
                        paths: ['.'],
                        plugins: [
                            new (require('less-plugin-autoprefix'))({browsers: '> 5%'}),
                            new (require('less-plugin-clean-css'))()
                        ]
                    },
                    files: {
                        'production/www/css/stylesheet.min.css': 'source/www/less/stylesheet.less'
                    }
                }
            },

            concat: {
                options: {
                    stripBanners: true
                },
                source: {
                    src: ['source/www/modules/**/*.js'],
                    dest: 'production/www/js/modules.js'
                }
            },

            htmlmin: {
                options: {
                    removeComments: true,
                    removeCommentsFromCDATA: true,
                    removeCDATASectionsFromCDATA: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeRedundantAttributes: true,
                    removeIgnored: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    // SSI statements need to be ignored
                    ignoreCustomComments: [new RegExp('#(.*)')]
                },
                webpages: {
                    expand: true,
                    cwd: 'source/www',
                    src: ['*.html', '!boilerplate.html'],
                    dest: 'production/www/'
                },
                snippets: {
                    expand: true,
                    cwd: 'source/www/snippets',
                    src: ['**/*.html'],
                    dest: 'production/www/snippets/'
                }
            },

            htmlangular: {
                options: {
                    relaxerror: ['Comments seen before doctype. Internet Explorer will go into the quirks mode.'],
                    customtags: ['header', 'footer', 'projects'],
                    reportpath: null,
                    charset: false
                },
                source: {
                    expand: true,
                    cwd: 'source/www/',
                    // commonheadtags.tmpl.html must be ignored as htmlangular is not smart enough to wrap head tags for the W3C validator
                    src: ['*.html', 'snippets/*.html', '!snippets/commonheadtags.tmpl.html']
                },
                production: {
                    expand: true,
                    cwd: 'production/www/',
                    // commonheadtags.tmpl.html must be ignored as htmlangular is not smart enough to wrap head tags for the W3C validator
                    src: ['*.html', 'snippets/*.html', '!snippets/commonheadtags.tmpl.html']
                }
            },

            jsonmin: {
                source: {
                    expand: true,
                    cwd: 'source/',
                    src: 'www/data/**/*.json',
                    dest: 'production/'
                }
            }

        });

        require('load-grunt-tasks')(grunt);

        grunt.registerTask('default', [
            'jslint:gruntfile',
            'jslint:test',
            'karma:source',
            'jslint:source',
            'htmlangular:source',
            'clean',
            'copy',
            'htmlmin',
            'concat',
            'uglify',
            'less:source',
            'jsonmin:source',
            'karma:production',
            'htmlangular:production'
        ]);

        grunt.registerTask('movetoprod', [
            'clean',
            'copy',
            'uglify'
        ]);

        grunt.registerTask('testsource', [
            'karma:source'
        ]);

        grunt.registerTask('testprod', [
            'movetoprod',
            'karma:production'
        ]);

        grunt.registerTask('test', [
            'testsource',
            'testprod'
        ]);

    };
}());

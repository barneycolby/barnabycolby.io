/*global module */
(function () {
    'use strict';

    module.exports = {

        css: {
            expand: true,
            cwd: '<%= destinationWorkingDirectory %>',
            src: ['*.html'],
            dest: '<%= destinationWorkingDirectory %>/'
        }

    };

}());

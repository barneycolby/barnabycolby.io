/*global angular */
(function () {
    "use strict";

    var app = angular.module('header', []);

    app.directive('header', function () {
        return {
            restrict: 'E',
            templateUrl: '/snippets/header.html'
        };
    });
}());

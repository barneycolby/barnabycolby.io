// ============================= header.js ============================ //
// AngularJS module containing directives and controllers for the
// header.
// ==================================================================== //

/*global angular */
(function () {
    "use strict";

    var app = angular.module('header', []);

    // We must configure the location provider before it can be used
    app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true,
            rewriteLinks: false
        });
    }]);

    app.directive('header', function () {
        return {
            restrict: 'E',
            templateUrl: '/snippets/header.html'
        };
    });

    app.controller('NavigationLinkController', ['$scope', '$location', function ($scope, $location) {
        $scope.isActive = function (pathToCheck) {
            return pathToCheck === $location.path();
        };
    }]);
}());

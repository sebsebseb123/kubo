'use strict';

angular.module('designbykubocomApp', [
  'ivpusic.cookie',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/steps', {
        templateUrl: 'views/steps.html',
        controller: 'StepsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

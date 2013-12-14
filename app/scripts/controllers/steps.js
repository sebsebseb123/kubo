'use strict';

angular.module('designbykubocomApp')
  .controller('StepsCtrl', ['$scope', '$http', 'ipCookie', function ($scope, $http, ipCookie) {
    // Get the steps... from cache if possible.
    var getSteps = function () {
      if (!ipCookie('stepsData')) {
        // If no cookie data, retrieve it and set it.
        getJson();
      }
      else {
        parseData(ipCookie('stepsData'));
      }
    };

    // Get the data from json.
    var getJson = function () {
      $http.jsonp('http://dev-design-by-kubo.gotpantheon.com/steps?callback=JSON_CALLBACK')
        .success(function(data) {
          // Save the data, then parse it.
          ipCookie('stepsData', data);
          parseData(data);
        });
    };

    // Parse the data and get it ready for the page.
    var parseData = function (data) {
      // Parse the data.
      data = data[0];
      var paragraph = data.body;
      var steps = data.field_steps.split('&lt;&lt;&gt;&gt;');
      console.log(paragraph);
      console.log(steps);
      // Then add it to the scope.
      $scope.paragraph = paragraph;
      $scope.steps = steps;
    };

    // Get the steps, parse them, then add them to the scope.
    getSteps();
  }]);

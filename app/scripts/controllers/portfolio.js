'use strict';

angular.module('designbykubocomApp')
  .controller('PortfolioCtrl', ['$scope', 'getter', function ($scope, getter) {
    // Add an event listener.
    $scope.$on('dataLoaded', function(event, pageData) {
      $scope.page = pageData;
    });

    // Get data, and fire event when ready.
    getter.getData($scope, 'portfolio');
  }]);

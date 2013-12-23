'use strict';

angular.module('designbykubocomApp')
  .controller('PortfolioCtrl', ['$scope', 'getter', function ($scope, getter) {
    // Add an event listener.
    $scope.$on('dataLoaded', function(event, pageData) {
      $scope.page = pageData;
    });

    // Get data, and fire event when ready.
    getter.getData($scope, 'portfolio');

    // Default values.
    $scope.activeCaseStudy = 0;
    $scope.activeImage = 0;

    // Function to set the activeCaseStudy.
    $scope.setActiveCaseStudy = function (i) {
      $scope.activeImage = 0;
      $scope.activeCaseStudy = i;
    }

    // Function to set the activeImage.
    $scope.setActiveImage = function (i) {
      $scope.activeImage = i;
    }
  }]);

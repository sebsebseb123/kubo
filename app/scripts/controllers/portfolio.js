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
    $scope.activeCase = -1;
    $scope.activeCaseImage = [];

    // Function to set the activeCaseStudy.
    $scope.setActiveCase = function (caseIndex) {
      // Set the activeCase index.
      $scope.activeCase = caseIndex;
      $scope.activeCaseImage = [];

      // Select first image, if none selected.
      if ($scope.activeCaseImage[caseIndex] == undefined) {
        $scope.activeCaseImage[caseIndex] = 0;
      }
    }

    // Function to set the remove the activeCaseStudy.
    $scope.removeActiveCase = function ($event) {
      // Set the activeCase index.
      $scope.activeCase = -1;
      $scope.activeCaseImage = [];

      // Prevent bubbling to showItem.
      // On recent browsers, only $event.stopPropagation() is needed
      if ($event.stopPropagation) $event.stopPropagation();
      if ($event.preventDefault) $event.preventDefault();
      $event.cancelBubble = true;
      $event.returnValue = false;
    }

    // Function to set the activeImage.
    $scope.setActiveImage = function (caseIndex, imageIndex) {
      // Get the number of images for this case study.
      var numImgs = $scope.page.caseStudies[caseIndex].images.length;

      // Don't do anything if we've gone too far.
      if (imageIndex < numImgs) {
        // Otherwise, set the activeImage for this case.
        $scope.activeCaseImage[caseIndex] = imageIndex;
      }
    }
  }]);

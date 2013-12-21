'use strict';

angular.module('designbykubocomApp')
  .controller('MainCtrl', ['$scope', 'getter', function ($scope, getter) {
    $scope.page = getter.getData('contact');
  }]);

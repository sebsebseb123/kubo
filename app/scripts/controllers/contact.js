'use strict';

angular.module('designbykubocomApp')
  .controller('ContactCtrl', ['$scope', 'getter', function ($scope, getter) {
    $scope.page = getter.getData('contact');
  }]);

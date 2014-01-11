'use strict';

angular.module('designbykubocomApp')
  .controller('ContactCtrl', ['$scope', '$http', 'getter', function ($scope, $http, getter) {
    // Add an event listener.
    $scope.$on('dataLoaded', function(event, pageData) {
      $scope.page = pageData;
    });

    // Get data, and fire event when ready.
    getter.getData($scope, 'contact');

    // Set flag defaults.
    $scope.contactSending = false;
    $scope.contactSent = false;

    // Add a newsletter signup.
    $scope.addNewContact = function () {
      // Get the form data from the scope.
      var user = $scope.user;
      $scope.contactSending = true;

      // Prepare the data.
      var nodeData = {
        'title': 'Contact Request',
        'type': 'contact_request',
        'body': {'und': [{'value': user.message} ]},
        'field_user_email': {'und': [{'email': user.email} ]}
      };

      // POST the data and create a node.
      $http({url: 'http://designbykubo.com/_drupal/api/node.json', method: 'POST', data: nodeData}).
        success(function(data, status) {
          // Reset form.
          $scope.user = {};
          // Set our "signupSent" flag.
          $scope.contactSent = true;
          $scope.contactSending = false;
        });
    }
  }]);

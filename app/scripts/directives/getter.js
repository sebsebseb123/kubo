;'use strict';

angular.module('getter.directives', [])
  .factory('getter', ['$http', 'localStorageService', function ($http, localStorageService) {
    return {
      getData: function($scope, type) {
        // Check for a type.
        if (type == undefined) {
          console.warn("type == undefined | You're trying to get data, but haven't defined what type.");
          return;
        }

        // Set global vars.
        var pageData;

        //debugger;

        // Set config object, with urls and parsers.
        var config = {
          'about': {
            'url': 'http://dev-design-by-kubo.gotpantheon.com/about?callback=JSON_CALLBACK',
            'parser': function(data) {
              // Reset pageData object, then set it up.
              pageData = {};
              pageData.about_bodies = data.field_about_body.split('&lt;&lt;&gt;&gt;');
              // Then return it.
              return pageData;
            }
          },
          'steps': {
            'url': 'http://dev-design-by-kubo.gotpantheon.com/steps?callback=JSON_CALLBACK',
            'parser': function(data) {
              // Reset pageData object, then set it up.
              pageData = {};
              pageData.body = data.body;
              pageData.steps = data.field_steps.split('&lt;&lt;&gt;&gt;');
              // Then return it.
              return pageData;
            }
          },
          'contact': {
            'url': 'http://dev-design-by-kubo.gotpantheon.com/contact?callback=JSON_CALLBACK',
            'parser': function(data) {
              // Reset pageData object, then set it up.
              pageData = {};
              pageData.body = data.body;
              // Then return it.
              return pageData;
            }
          }
        };

        // Get the data from json.
        var getJson = function () {
          $http.jsonp(config[type].url)
            .success(function(data) {
              // Parse the data.
              pageData = config[type].parser(data[0]);

              // Compare to cached, and set if needed.
              cachedPageData = localStorageService.get(type);
              if (cachedPageData !== pageData) {
                localStorageService.add(type, pageData);
                $scope.$emit('dataLoaded', pageData);
              }
            });
        };

        // Try to get/set pageData.
        if (!localStorageService.get(type)) {
          // If no cookie data, retrieve it and set it.
          getJson();
        }
        else {
          // Get data from cookie.
          pageData = localStorageService.get(type);
          $scope.$emit('dataLoaded', pageData);
          getJson();
        }
      }
    }
  }])
;

;'use strict';

angular.module('getter.directives', [])
  .factory('getter', ['$http', 'ipCookie', function ($http, ipCookie) {
    return {
      getData: function(type) {
        // Check for a type.
        if (type == undefined) {
          console.warn("type == undefined | You're trying to get data, but haven't defined what type.");
          return;
        }

        // Set global vars.
        var pageData;
        var rawData;

        // Set config object, with urls and parsers.
        var config = {
          'steps': {
            'url': 'http://dev-design-by-kubo.gotpantheon.com/steps?callback=JSON_CALLBACK',
            'parser': function() {
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
            'parser': function() {
              // Reset pageData object, then set it up.
              pageData = {};
              pageData.body = rawData.body.split('&lt;&lt;&gt;&gt;');
              // Then return it.
              return pageData;
            }
          }
        };

        // Get the data from json.
        var getJson = function () {
          console.log('inhere with type = ' + type);
          $http.jsonp(config[type].url)
            .success(function(data) {
              // Save the data, then parse it.
              rawData[type] = data;
            });
        };

        // Try to get/set pageData.
        if (!ipCookie(type)) {
          // If no cookie data, retrieve it and set it.
          getJson();
          config[type].parser();
          ipCookie(type, pageData);
        }
        else {
          // Get data from cookie.
          pageData = ipCookie(type);
        }

        return pageData;
      }
    }
  }])
;

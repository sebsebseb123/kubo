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

        // Set config object, with urls and parsers.
        var config = {
          'about': {
            'event': 'dataLoaded',
            'url': 'http://designbykubo.com/_drupal/about?callback=JSON_CALLBACK',
            'parser': function(data) {
              // Reset pageData object, then set it up.
              pageData = {};
              pageData.about_bodies = data[0].field_about_body.split('&lt;&lt;&gt;&gt;');
              // Then return it.
              return pageData;
            }
          },
          'testimonials': {
            'event': 'testimonialsLoaded',
            'url': 'http://designbykubo.com/_drupal/testimonials?callback=JSON_CALLBACK',
            'parser': function(data) {
              // Reset pageData object, then set it up.
              pageData = {};

              // Add out testimonial data.
              pageData = data;

              // Then return it.
              return pageData;
            }
          },
          'portfolio': {
            'event': 'dataLoaded',
            'url': 'http://designbykubo.com/_drupal/portfolio?callback=JSON_CALLBACK',
            'parser': function(data) {
              // Reset pageData object, then set it up.
              pageData = {};
              pageData.body = data[0].body;
              pageData.caseStudies = [];
              for (var i = 0; i < data.length; i++) {

                // Create tmp var.
                var caseStudy = {};
                caseStudy.title = data[i].title;
                caseStudy.body = data[i].body_1;
                caseStudy.images = data[i].images.split('||||');
                caseStudy.thumbs = data[i].thumbnails.split('||||');

                // Get image titles.
                caseStudy.imageTitles = [];
                caseStudy.thumbTitles = [];
                for (var j = 0; j < caseStudy.images.length; j++) {
                  caseStudy.imageTitles[j] = $(caseStudy.images[j]).attr('title');
                  caseStudy.thumbTitles[j] = $(caseStudy.thumbs[j]).attr('title');
                }

                // Add tmp var to pageData.
                pageData.caseStudies.push(caseStudy);
              }
              // Then return it.
              return pageData;
            }
          },
          'steps': {
            'event': 'dataLoaded',
            'url': 'http://designbykubo.com/_drupal/steps?callback=JSON_CALLBACK',
            'parser': function(data) {
              // Reset pageData object, then set it up.
              pageData = {};
              pageData.body = data[0].body;
              pageData.steps = data[0].field_steps.split('&lt;&lt;&gt;&gt;');
              // Then return it.
              return pageData;
            }
          },
          'contact': {
            'event': 'dataLoaded',
            'url': 'http://designbykubo.com/_drupal/contact?callback=JSON_CALLBACK',
            'parser': function(data) {
              // Reset pageData object, then set it up.
              pageData = {};
              pageData.body = data[0].body;
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
              pageData = config[type].parser(data);

              // Compare to cached, and set if needed.
              var cachedPageData = localStorageService.get(type);

              if (JSON.stringify(cachedPageData) != JSON.stringify(pageData)) {
                localStorageService.add(type, pageData);
                $scope.$emit(config[type].event, pageData);
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
          $scope.$emit(config[type].event, pageData);
          getJson();
        }
      }
    }
  }])
;

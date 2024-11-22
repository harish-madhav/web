// Define AngularJS module and controller
var app = angular.module('eventApp', []);

// Service to simulate data storage
app.factory('EventService', function() {
    var registrations = [];

    return {
        getRegistrations: function() {
            return registrations;
        },
        addRegistration: function(registration) {
            registrations.push(registration);
        }
    };
});

// EventController
app.controller('EventController', function($scope, EventService) {
    // Pre-defined event types
    $scope.eventTypes = ['Conference', 'Workshop', 'Meetup', 'Webinar'];
    
    // Initialize event object
    $scope.event = {};
    
    // Retrieve registrations
    $scope.registrations = EventService.getRegistrations();
    
    // Submit form
    $scope.submitForm = function() {
        EventService.addRegistration(angular.copy($scope.event));
        $scope.event = {}; // Reset form
    };
});

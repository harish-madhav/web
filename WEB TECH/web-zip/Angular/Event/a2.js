// Define the AngularJS application
var app = angular.module('eventApp', []);

// Define a service to fetch the events
app.service('EventService', function() {
    this.getEvents = function() {
        return [
            { name: 'Music Concert', date: '2024-12-01', location: 'New York', price: 100 },
            { name: 'Art Exhibition', date: '2024-12-15', location: 'Paris', price: 50 },
            { name: 'Tech Conference', date: '2025-01-10', location: 'San Francisco', price: 200 }
        ];
    };
});

// Define a controller to manage the data
app.controller('EventController', ['EventService', function(EventService) {
    var vm = this;

    // List of currencies
    vm.currencies = ['USD', 'EUR', 'INR'];

    // Get events from the service
    vm.events = EventService.getEvents();
}]);

// Define the AngularJS application
var app = angular.module('travelApp', []);

// Define a factory to provide travel package data
app.factory('TravelFactory', function() {
    var packages = [
        {
            name: 'Tropical Paradise',
            flightDetails: 'Flight XYZ123 from NYC to Maldives',
            hotelOptions: 'Ocean View Resort, Beachside Hotel',
            price: 2000
        },
        {
            name: 'European Adventure',
            flightDetails: 'Flight ABC789 from LA to Paris',
            hotelOptions: 'City Center Hotel, Eiffel Stay',
            price: 3000
        },
        {
            name: 'Asian Escape',
            flightDetails: 'Flight LMN456 from SF to Tokyo',
            hotelOptions: 'Downtown Hotel, Sakura Inn',
            price: 2500
        }
    ];

    return {
        getPackages: function() {
            return packages;
        },
        checkAvailability: function(packageName, startDate, endDate) {
            // Mock availability check (can be replaced with an API call)
            if (startDate && endDate) {
                return `The "${packageName}" package is available from ${startDate} to ${endDate}.`;
            }
            return 'Please provide valid dates to check availability.';
        }
    };
});

// Define a controller to interact with the factory
app.controller('TravelController', ['TravelFactory', function(TravelFactory) {
    var vm = this;

    // Get travel packages from the factory
    vm.packages = TravelFactory.getPackages();

    // Initialize variables for availability check
    vm.selectedPackage = null;
    vm.startDate = null;
    vm.endDate = null;
    vm.availabilityMessage = '';

    // Function to check availability
    vm.checkAvailability = function() {
        if (vm.selectedPackage && vm.startDate && vm.endDate) {
            vm.availabilityMessage = TravelFactory.checkAvailability(
                vm.selectedPackage.name,
                vm.startDate,
                vm.endDate
            );
        } else {
            vm.availabilityMessage = 'Please select a package and valid dates.';
        }
    };
}]);

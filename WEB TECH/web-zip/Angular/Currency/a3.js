// Define the AngularJS module
const app = angular.module('roomBookingApp', []);

// Custom Filter to Convert Price to Different Currencies
app.filter('currencyConverter', function () {
    const rates = {
        USD: 0.012, // Example: 1 INR = 0.012 USD
        EUR: 0.011, // Example: 1 INR = 0.011 EUR
        GBP: 0.009, // Example: 1 INR = 0.009 GBP
    };

    return function (price, currency) {
        if (!currency || !rates[currency]) return price; // Return original price if no conversion needed
        return (price * rates[currency]).toFixed(2) + ' ' + currency;
    };
});

// Service for Managing Bookings
app.service('RoomService', function () {
    const bookings = [];

    // Add Booking
    this.addBooking = function (roomDetails) {
        bookings.push(angular.copy(roomDetails));
    };

    // Get All Bookings
    this.getBookings = function () {
        return bookings;
    };

    // Delete Booking by Room Number
    this.deleteBooking = function (roomNumber) {
        const index = bookings.findIndex(room => room.roomNumber === roomNumber);
        if (index !== -1) {
            bookings.splice(index, 1);
        }
    };
});

// Factory for Dependency Injection (can add external APIs)
app.factory('RoomFactory', function () {
    return {
        getCurrencies: function () {
            return ['INR', 'USD', 'EUR', 'GBP']; // Available Currencies
        }
    };
});

// Main Controller
app.controller('RoomController', ['$scope', 'RoomService', 'RoomFactory', function ($scope, RoomService, RoomFactory) {
    $scope.roomDetails = {}; // Model for Form
    $scope.bookings = RoomService.getBookings(); // Get All Bookings
    $scope.currencies = RoomFactory.getCurrencies(); // Get Currencies from Factory
    $scope.selectedCurrency = 'INR'; // Default Currency

    // Function to Book Room
    $scope.bookRoom = function () {
        RoomService.addBooking($scope.roomDetails);
        $scope.roomDetails = {}; // Clear Form
    };

    // Function to Delete Room
    $scope.deleteRoom = function (roomNumber) {
        RoomService.deleteBooking(roomNumber);
    };
}]);

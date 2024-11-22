// Main Module
var app = angular.module('bookingApp', []);

// Service for CRUD operations
app.factory('bookingService', function ($http) {
  const API_URL = 'http://localhost:3000/users';
  
  return {
    getAll: function () {
      return $http.get(API_URL);
    },
    add: function (booking) {
      return $http.post(API_URL, booking);
    },
    update: function (id, booking) {
      return $http.put(`${API_URL}/${id}`, booking);
    },
    delete: function (id) {
      return $http.delete(`${API_URL}/${id}`);
    }
  };
});

// Custom Filter
app.filter('bookingFilter', function () {
  return function (bookings, query) {
    if (!query) return bookings;
    return bookings.filter(booking => 
      booking.name.toLowerCase().includes(query.toLowerCase()) ||
      booking.email.toLowerCase().includes(query.toLowerCase()) ||
      booking.phone.includes(query)
    );
  };
});

// Controller
app.controller('bookingController', function ($scope, bookingService) {
  $scope.bookings = [];
  $scope.booking = {};
  $scope.isEditing = false;

  // Fetch all bookings
  const fetchBookings = function () {
    bookingService.getAll().then(response => {
      $scope.bookings = response.data;
    });
  };

  // Add or update booking
  $scope.submitBooking = function () {
    if ($scope.isEditing) {
      bookingService.update($scope.booking.id, $scope.booking).then(() => {
        alert('Booking updated!');
        fetchBookings();
        $scope.resetForm();
      });
    } else {
      bookingService.add($scope.booking).then(() => {
        alert('Booking added!');
        fetchBookings();
        $scope.resetForm();
      });
    }
  };

  // Edit booking
  $scope.editBooking = function (booking) {
    $scope.booking = angular.copy(booking);
    $scope.isEditing = true;
  };

  // Delete booking
  $scope.deleteBooking = function (id) {
    bookingService.delete(id).then(() => {
      alert('Booking deleted!');
      fetchBookings();
    });
  };

  // Reset form
  $scope.resetForm = function () {
    $scope.booking = {};
    $scope.isEditing = false;
  };

  // Initialize
  fetchBookings();
});

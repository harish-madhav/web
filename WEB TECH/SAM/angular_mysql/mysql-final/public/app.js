var app = angular.module('crudApp', []);

app.controller('crudController', function ($scope, $http) {
  $scope.users = [];
  $scope.user = {};
  $scope.isEditing = false;

  // Fetch users
  $scope.fetchUsers = function () {
    $http.get('http://localhost:3000/users').then(function (response) {
      $scope.users = response.data;
    });
  };

  // Add or Update user
  $scope.handleSubmit = function () {
    if ($scope.isEditing) {
      $scope.updateUser();
    } else {
      $scope.addUser();
    }
  };

  $scope.addUser = function () {
    $http.post('http://localhost:3000/users', $scope.user).then(function (response) {
      alert('User added!');
      $scope.fetchUsers();
      $scope.user = {};
    });
  };

  $scope.updateUser = function () {
    $http.put(`http://localhost:3000/users/${$scope.user.id}`, $scope.user).then(function () {
      alert('User updated!');
      $scope.fetchUsers();
      $scope.user = {};
      $scope.isEditing = false;
    });
  };

  // Edit user
  $scope.editUser = function (user) {
    $scope.user = angular.copy(user);
    $scope.isEditing = true;
  };

  // Delete user
  $scope.deleteUser = function (id) {
    $http.delete(`http://localhost:3000/users/${id}`).then(function () {
      alert('User deleted!');
      $scope.fetchUsers();
    });
  };

  // Initialize users
  $scope.fetchUsers();
});

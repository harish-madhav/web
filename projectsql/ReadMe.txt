CREATE DATABASE dbname;

USE dbname;

CREATE TABLE student_detail (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    gender VARCHAR(10),
    mail VARCHAR(255),
    branch VARCHAR(255),
    city VARCHAR(255),
    year VARCHAR(255),
    current VARCHAR(255)
);





CUSTOM DIRECTIVE 


<!DOCTYPE html>
<html ng-app="myApp">
<head>
    <title>Custom Directive Example</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
    <script>
        // Define the AngularJS app
        var app = angular.module('myApp', []);

        // Define a custom directive called 'greetingMessage'
        app.directive('greetingMessage', function() {
            return {
                restrict: 'E',  // Restrict the directive to an element type
                template: '<h1>Hello, {{name}}! Welcome to AngularJS Directives.</h1>'  // The HTML that will be inserted
            };
        });

        // Define the controller
        app.controller('myCtrl', function($scope) {
            $scope.name = 'John';  // Example name to display
        });
    </script>
</head>
<body ng-controller="myCtrl">
    <h2>Custom Directive Example</h2>
    
    <!-- Use the custom directive as an element -->
    <greeting-message></greeting-message>
</body>
</html>


Filter

<!DOCTYPE html>
<html>
    
    <script src ="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
    <body>
        <div ng-app="myapp">
        <div ng-controller="myctrl as myctrl">
            Name:<input type="text" ng-model="myctrl.firstname"><br>
            Age:<input type="number" ng-model="myctrl.age"><br>
        {{ firstname  +" "+age }} <br>
        Filters:<br>
        {{firstname | uppercase }} <br>   {{firstname | lowercase}} <br>
        <ul>
            <li ng-repeat="x in fruits| orderBy:'name'">
                {{x.name+','+x.price}}
            </li>
        </ul>
       Price for currency filter : {{ money | currency}}<br>
        Marks:{{Marks()}}

        <ul>
            <li ng-repeat="x in fruits">
                {{x.name+','+x.price}}
            </li>
        </ul><br>
        Fruit names with letter 'p'<br>
        <ul>
            <li ng-repeat="x in fruits | filter : 'p'">
                {{x.name}}
            </li>
        </ul>
<!--filter based on user input-->
<br>Enter the fruit name : <input type ="text" ng-model="test">
        <ul>
            <li ng-repeat="x in fruits | filter : test">
                {{x.name+','+x.price}}
            </li>
        </ul><br>

<!--Based on clicking the heading of the table and print by orderBy filter-->
 <table border="1" width="100%">
    <tr>
        <th ng-click="orderByMe('name')">Name</th>
        <th ng-click="orderByMe('price')">Price</th>
    </tr>
    <tr ng-repeat ="x in fruits | orderBy:''">
        <td>{{x.name}}</td>
        <td>{{x.price}}</td>
    </tr>
 </table>
<br>
    <!-- Custom filter -->
     <ul ng-controller="ctrll">
        <li ng-repeat = "y in books">
            {{y | myformat}}
        </li>
     </ul>
    </div>

    <!-- Get the list -->
    <div ng-controller="cart as cart">
    Enter item name: <input type="text" ng-model="cart.fname">
    Enter price : <input type="number" ng-model="cart.cost">
    <button ng-click="cart.add()">Add to Cart</button>
    </div>
    <!--Print the list and remove-->
    <div ng-controller="list as list">
        <ul>
            <li ng-repeat = "z in list.items">
                {{z.fname}} of {{z.cost}}
            <button ng-click="list.remove($index);">Remove</button>
            </li>
        </ul>
    </div>
    </div>
    
        <script>
            var app = angular.module('myapp',[]);
            
            app.controller('myctrl',function($scope){
                $scope.firstname="Mahir";
                $scope.age=25;
                $scope.money=1000;
                $scope.Marks=function(){
                    return $scope.age;
                }

                $scope.fruits=[
                {name:'CustardApple',price:'24'},
                {name:'Bamblimass',price:'500'},
                {name:'Apple',price:'60'},
                {name:'Pomegranate',price:'90'}];
 
                $scope.orderByMe=function(x){
                $scope.mywish = x;
            }
            });
        
            app.filter('myformat',function(){
                return function(y){
                    var i,c,t="";
                    for(i=0;i<y.length;i++){
                        c=y[i];
                        if( i % 2 == 0){
                            c=c.toUpperCase();  //abcd AbCd
                        }
                        t+=c;
                    }return t;
                }; 
            });
            app.controller('ctrll',function($scope){
                $scope.books=['Thosethreebears','Tempest','Thegreat','Abdul Kalam'];
            });

            app.service('cartservice',function(){
                var items=[];
                this.add=function(fname, cost){
                items.push({ fname : fname, cost : cost});
                };
                this.remove=function(index){
                    items.splice(index, 1)
                };
                this.getitems=function(){
                    return items;
                };
            });

            app.controller('cart',['cartservice',function(cartservice){
                var cart=this;
                cart.fname="";
                cart.cost="";
                cart.add = function(){
                    if (cart.fname && cart.cost) {
                    cartservice.add(cart.fname, cart.cost);
                    cart.fname = ""; // Clear input fields after adding
                    cart.cost = "";
                }
                };
            }]);


            app.controller('list',['cartservice',function(cartservice){
                var list=this;
                list.items=cartservice.getitems();
                list.remove=function(index){
                    cartservice.remove(index);
                };
        }]);
         </script>
    </body>
 </html>




ng-list




<!DOCTYPE html>
<html ng-app="myApp">
<head>
    <title>ng-list Example</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
    <script>
        // Define the AngularJS app
        var app = angular.module("myApp", []);

        // Define the controller
        app.controller("myCtrl", function($scope) {
            // Nothing special needed in the controller for ng-list
        });
    </script>
</head>
<body ng-controller="myCtrl">
    <h1>ng-list Example</h1>

    <!-- Input with ng-list, which will convert the comma-separated string into an array -->
    Enter fruits (comma-separated): <input type="text" ng-model="fruits" ng-list=",">
    
    <p>Fruits as Array:</p>
    <ul>
        <!-- Display the fruits as a list -->
        <li ng-repeat="fruit in fruits">{{ fruit }}</li>
    </ul>
</body>
</html>







SERVICE 





<script>
        var app = angular.module("app", ['ngAnimate']);

        app.service("service1", function ($http) {
            this.submit = function (st) {
                return $http.post("http://localhost:3000/register", st);
            };
            this.show = function () {
                return $http.get("http://localhost:3000/fetch");
            };
            this.delete = function (st1) {
                return $http.post("http://localhost:3000/deletes", st1);
            };
            this.update = function (st2) {
                return $http.post("http://localhost:3000/updates", st2);
            };
        });

        app.controller('ctrl', function ($scope, service1) {
            $scope.student = {};
            $scope.updates = {};
            $scope.deletes = {};
            $scope.list = [];
            $scope.list1 = [];

            $scope.submit = function () {
                service1.submit($scope.student).then(function (res) {
                    console.log("Result submit: " + res.data);
                    $scope.student = {};  // Reset form after submission
                }).catch(function (err) {
                    console.log("Error: " + err);
                });
            };

            $scope.show = function () {
                service1.show().then(function (res) {
                    console.log("Result show: " + res.data);
                    $scope.list = res.data;
                    $scope.show1 = true;
                }).catch(function (err) {
                    console.log("Error: " + err);
                });
            };

            $scope.update = function () {
                service1.update($scope.updates).then(function (res) {
                    console.log("Result update: " + res.data);
                    $scope.updates = {};  // Reset update fields after submission
                }).catch(function (err) {
                    console.log("Error: " + err);
                });
            };

            $scope.delete = function () {
                service1.delete($scope.deletes).then(function (res) {
                    console.log("Result delete: " + res.data);
                    $scope.deletes = {};  // Reset delete fields after submission
                }).catch(function (err) {
                    console.log("Error: " + err);
                });
            };

            $scope.search = function () {
                $scope.show2 = true;  // Show the search results table
            };
        });
    </script>













TIMEOUT







<!DOCTYPE html>
<html ng-app="myApp">
<head>
    <title>AngularJS Built-in Services Example</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
    <script>
        // Define the AngularJS app
        var app = angular.module('myApp', []);

        // Define the controller
        app.controller('myCtrl', function($scope, $http, $timeout) {
            $scope.message = "Fetching data...";

            // Simulate an API request using $http service
            $http.get('https://jsonplaceholder.typicode.com/posts/1')
                .then(function(response) {
                    $scope.post = response.data;
                });

            // Use $timeout service to update the message after 3 seconds
            $timeout(function() {
                $scope.message = "Data loaded!";
            }, 3000);
        });
    </script>
</head>
<body ng-controller="myCtrl">
    <h2>{{ message }}</h2>

    <!-- Display data fetched by $http -->
    <h3>{{ post.title }}</h3>
    <p>{{ post.body }}</p>
</body>
</html>





var app = angular.module('index', ['ui.router', 'ngRoute'])
.run(function ($rootScope) {
})
.config([ '$routeProvider', function($routeProvider){
  $routeProvider
  .when("/", {templateUrl: './src/views/main.html', controller: "main as vm"})
  .otherwise({redirectTo: '/unauthorized'});
}])

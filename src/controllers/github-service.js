app.service('githubAPI', ['$http', function($http){
  vm = this;
  vm.getRepositories = function() { return $http.get('https://api.github.com/repositories') }
  vm.getSubscribers = function(data) { return $http.get(data)}
}])

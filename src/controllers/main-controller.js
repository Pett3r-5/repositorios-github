app.controller('main', ['$scope', 'githubAPI', function($scope, githubAPI){
  var vm = this;
  vm.repositories = {};
  vm.repsCount = 0;
  vm.subsCount = 0;

  githubAPI.getRepositories().then(function(res){
    res.data = res.data.map(function(element) {
      vm.repositories[element.id] = { name: element.name, id: element.id, subs: element.subscribers_url, selected: false };
      return element;
    });
  }).catch(function(error) {
    console.log(error);
  });

  // vm.select = function($event, rep) {
  //   $event.preventDefault();
  //   if (rep.selected === true) {
  //     vm.repsCount--;
  //     githubAPI.getSubscribers(rep.subs).then(function(subs) {
  //       vm.subsCount = vm.subsCount - subs.data.length;
  //     });
  //   } else if (rep.selected === false) {
  //     vm.repsCount++;
  //     githubAPI.getSubscribers(rep.subs).then(function(subs) {
  //       vm.subsCount = vm.subsCount + subs.data.length;
  //     });
  //   }
  //   vm.selectedStatus({id: rep.id, selected: rep.selected})
  // }
}])

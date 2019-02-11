app.directive('bodyContainer', function(){
  return {
    templateUrl: "./src/views/body.html"
  }
})


app.directive('repositoriesList', [ '$timeout', 'githubAPI', function($timeout, githubAPI){
  return {
    scope: {
      repositories: '=',
      repsCount: '=',
      subsCount: '='
    },
    link: function (scope, element, $attr) {
      scope.select = function ($event, rep) {
        $event.preventDefault();
        if (rep.selected === true) {
          scope.repsCount--;
          githubAPI.getSubscribers(rep.subs).then(function(subs) {
            scope.subsCount = scope.subsCount - subs.data.length;
          });
        } else if (rep.selected === false) {
          scope.repsCount++;
          githubAPI.getSubscribers(rep.subs).then(function(subs) {
            scope.subsCount = scope.subsCount + subs.data.length;
          });
        }
        scope.selectedStatus({id: rep.id, selected: rep.selected})
      }

      scope.selectedStatus = function(obj) {
        scope.repositories[obj.id]['selected'] = !obj.selected;
      };
    },
    templateUrl: './src/views/repository.html'
  }
}])

app.directive('headerCount', function() {
  return {
    template: '<header><div class="row"><div style="text-align: center; margin: 40px; font-family: MyriadProCondensed; font-size: 24px;">Número total de subscribers selecionados: {{vm.subsCount}}<div><div></header>'
  }
})

app.directive('footerCount', function() {
  return {
    template: '<footer><div class="row"><div style="text-align: center; margin: 40px;  font-family: MyriadProCondensed;  font-size: 20px;">Repositórios selecionados: {{vm.repsCount}}<div><div></footer>'
  }
})

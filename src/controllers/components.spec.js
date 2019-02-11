describe('repositoriesList', function () {
  var githubAPIService, $httpBackend, $scope, $compile, element, $rootScope;

  beforeEach(function(){
    angular.mock.module('index');
    module("my.templates");
  });

  beforeEach(inject(function (_$compile_, _$httpBackend_, _$controller_, _githubAPI_, _$rootScope_) {
    githubAPIService = _githubAPI_;
    $httpBackend = _$httpBackend_;
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();

    var html = '<repositories-list reps-count="0" repositories="{1: { selected: false} }" subs-count="0"></repositories-list>';
    $httpBackend.whenGET(/\.html$/).respond('');
    $httpBackend.whenGET('src/views/main.html').respond()
    $httpBackend.whenGET('src/views/repository.html').respond()
    element = $compile(html)($scope);
    $httpBackend.flush();
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }));

  it('exists', function() {
    expect(element.isolateScope().select).toBeDefined();
    expect(element.isolateScope().selectedStatus).toBeDefined();
  });

  describe('selectedStatus()', function () {
    it('should set repository\'s status to the inverted parameter value', function(){
      var obj = { id: 1, selected: true };
      element.isolateScope().selectedStatus(obj);
      expect(element.isolateScope().repositories[obj.id]['selected']).toEqual(false);
    });
  });

  describe('select()', function () {
    it('s counters should never be negative; it should set repository\'s status', function(){
      var $event = {preventDefault: function(){return 'ok'}};
      var obj = { selected: false, id: 1, subs: 'http://ok'};

      element.isolateScope().select($event, obj);

      expect(element.isolateScope().subsCount).not.toBeLessThan(0);
      expect(element.isolateScope().repsCount).not.toBeLessThan(0);
      expect(element.isolateScope().repositories[obj.id]['selected']).toEqual(true);
    });
  });


});

describe('main-controller', function(){
  var mainController;
  var githubAPIService;
  var mockValue = [];
  var $q, $scope;

  beforeEach(angular.mock.module('index'));
  beforeEach(inject(function(_$controller_, _githubAPI_, _$q_, _$rootScope_) {
    githubAPIService = _githubAPI_;
    $q = _$q_;
    $scope = _$rootScope_.$new();

    spyOn(githubAPIService,  'getRepositories').and.callThrough()
    mainController = _$controller_('main', {githubAPI: githubAPIService, $scope: $scope});
    // spyOn(mainController,  'select')
  }));

  it('exists', function() {
    expect(mainController).toBeDefined();
  });

  it('must initialize with API call to getRepositories', function(){
    expect(githubAPIService.getRepositories).toHaveBeenCalled();
  });
})

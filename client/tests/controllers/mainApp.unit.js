describe('mainApp.unit', function(){
  var createController, controller, $scope, getUserInfoService, $httpBackend;

  var testData = getTestData();
  beforeEach(module('mainApp'));

  beforeEach(inject(function($rootScope, $controller,_$httpBackend_, _getUserInfoService_){

    $scope = $rootScope.$new();
    getUserInfoService = _getUserInfoService_;
    $httpBackend = _$httpBackend_;
    createController = function(){
      return $controller('mainAppCtrl', {
        '$scope': $scope,
        'getUserInfoService': _getUserInfoService_,
      });
    };
  }));

  it('Should initialize the controller successfully', function(){
    controller = createController();
    expect(controller).toBeDefined();
  });

  it('Should call getUserInfoService and return the data - success scenario', function(){
    controller = createController();
    $httpBackend.expectGET('http://jsonplaceholder.typicode.com/posts').respond(testData.userData);
    $httpBackend.flush();
    expect($scope.userInfo[0].title).toEqual('This is test');
  });

  it('Should call getUserInfoService and return no data - error scenario', function(){
    controller = createController();
    $httpBackend.expectGET('http://jsonplaceholder.typicode.com/posts').respond(500, '');
    $httpBackend.flush();
    expect($scope.userInfo.error).toEqual(true);
  });


  function getTestData() {
    return {
      userData : [
                    {
                      userId: 1,
                      id: 1,
                      title: "This is test",
                      body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
                    },
                    {
                      userId: 1,
                      id: 2,
                      title: "qui est esse",
                      body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla"
                    }
                  ]
    };
  }
});
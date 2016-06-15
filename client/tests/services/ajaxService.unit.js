describe('ajaxService.unit', function() {

  var scope, $httpBackend, getUserInfoService;
  var testData = getTestData();
  beforeEach(module('ajaxServices'));

  beforeEach(inject(function($rootScope, _$httpBackend_, _getUserInfoService_) {
    scope = $rootScope.$new();
    getUserInfoService = _getUserInfoService_;
    $httpBackend = _$httpBackend_;
  }));

  it("Should test getUserInfoService", function() {
    $httpBackend.expectGET('http://jsonplaceholder.typicode.com/posts').respond(testData.userData);
    var ajaxResponse;
    getUserInfoService.success(function(response){
      ajaxResponse = response;
    });
    $httpBackend.flush();

    expect(ajaxResponse[0].title).toEqual('This is test');
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


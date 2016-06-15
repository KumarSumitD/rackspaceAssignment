describe("displayInfo", function() {
  //- Compiling Directive is not working along with templateUrl
  //- I think need to do some configs in karma.conf.js which i am not sure of.
  //- So for this file only written the test case without any validation
  var scope, $compile;

  beforeEach(module('displayInfoApp'));

  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $compile = _$compile_;
    scope = _$rootScope_;
  }));


  xit("should add loader class when data is not present", function() {

  });

  xit("should remove loader class when data is present", function() {

  });

  xit("should pass the keyName if the title is clicked", function() {

  });

  xit("should show error message when user info returns error", function() {

  });

  xit("should load the table when user info is valid", function() {

  });



  function compileParamDirective() {
    scope.userInfo = getTestData().userData;
    var html = '<div class="show-user-data" display-info infos="userInfo"></div>';
    var element = angular.element(html);

    var compiled = $compile(element)(scope);
    scope.$digest();
    return compiled;
  }

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
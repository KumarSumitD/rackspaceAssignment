describe("displayInfo", function() {

  var scope, $compile;

  beforeEach(module('displayInfoApp'));

  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $compile = _$compile_;
    scope = _$rootScope_;
  }));


  it("should add loader class when data is not present", function() {
    var testElement = compileParamDirective();
    scope.dataAvailable = false;
    scope.$digest();

    expect(testElement.hasClass('loader')).toEqual(true);
  });

  it("should remove loader class when data is present", function() {
    var testElement = compileParamDirective();
    scope.dataAvailable = true;
    scope.$digest();

    expect(testElement.hasClass('loader')).toEqual(false);
  });



  function compileParamDirective() {
    var html = '<div class="info-wrapper" ng-class="{loader: !dataAvailable}">'+
                '<div class="info-error" ng-if="error">There is something wrong from our side. Please try again later.</div>'+
                  '<div class="info-loader" ng-if="!dataAvailable && !error"><img src="assets/images/ajax-loader.gif" /></div>'+
                  '<div class="info-content-wrapper" ng-if="dataAvailable && !error">' +
                  '<div class="table-header-wrapper">' +
                  '<div class="th-row th-{{th}}" ng-repeat="th in tableHeaderInfo"><span ng-click="sortBy(th)">{{th}}</span></div></div>'+
                  '<div class="table-data-wrapper" ng-repeat="info in infos | orderBy: keyName : reverse">' +
                  '<div class="td-row td-{{th}}" ng-repeat="th in tableHeaderInfo">{{info[th]}}</div>' +
                  '</div>'+
                '</div>'+
              '</div>';
    var element = angular.element(html);

    var compiled = $compile(element)(scope);
    scope.$digest();
    return compiled;
  }
});
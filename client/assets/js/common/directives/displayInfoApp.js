var displayInfoApp = angular.module('displayInfoApp',[]);
// Display Table Directive
displayInfoApp.directive('displayInfo',[function(){
  'use strict';
  return {
    restrict: 'EAC',
    templateUrl: 'assets/templates/displayInfoTemplate.html',
    scope: {
      infos: '='
    },
    link: function(scope, element, attributes) {
      scope.dataAvailable = scope.error = false;
      scope.tableHeaderInfo = [];
      scope.reverse = false;

      scope.$watch("infos", function(newValue, oldValue) {
        if(newValue.error) {
          scope.dataAvailable = false;
          scope.error = true;
        }
        else if(newValue[0]) {
          scope.dataAvailable = true;
          for(var key in newValue[0]) {
            if(key !== '$$hashKey') scope.tableHeaderInfo.push(key);
          }
        }
      });

      scope.sortBy = function(keyName) {
        scope.keyName = keyName;
        scope.reverse = scope.keyName === keyName ? !scope.reverse : false;
      };
    }
  }
}]);
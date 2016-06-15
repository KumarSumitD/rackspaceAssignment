var ajaxServices = angular.module('ajaxServices',[]);

ajaxServices.
  factory("getUserInfoService", ["$http", function($http) {
    return $http({url: 'http://jsonplaceholder.typicode.com/posts', method: 'GET', timeout: 5000});
  }]);
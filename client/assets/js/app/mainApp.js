var mainApp = angular.module('mainApp',['ajaxServices', 'displayInfoApp']);
// Main App Controller
mainApp.controller('mainAppCtrl',['$scope', 'getUserInfoService', function($scope, getUserInfoService){
  $scope.userInfo = {};
  getUserInfoService.success(function(response){
    $scope.userInfo = response;
  }).error(function(err){
    $scope.userInfo = {
      error: true
    }
  });
}]);
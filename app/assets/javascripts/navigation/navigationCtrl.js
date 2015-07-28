angular.module('organizationsApp')
.controller('NavigationCtrl', [
'$scope',
'Auth',
function($scope, Auth){

    $scope.signedIn = Auth.isAuthenticated;
    $scope.logout = Auth.logout;

    //set $scope.user when the controller loads
    Auth.currentUser().then(function(user){
        $scope.user = user;
    });

    /*Event listeners to handle when the user authenticates and logs out. */
    $scope.$on('devise:new-registration', function (e, user){
        $scope.user = user;
    });

    $scope.$on('devise:login', function (e, user){
        $scope.user = user;
    });

    $scope.$on('devise:logout', function (e, user){
        $scope.user = {};
    });

}]);
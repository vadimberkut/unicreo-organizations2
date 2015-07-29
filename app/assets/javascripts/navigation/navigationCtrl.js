angular.module('organizationsApp')
.controller('NavigationCtrl', [
'$scope',
'Auth',
function($scope, Auth){

    $scope.signedIn = Auth.isAuthenticated;
    $scope.logout = Auth.logout;

    //set $scope.user when the controller loads
    Auth.currentUser().then(function(user){
        // User was logged in, or Devise returned previously authenticated session.
        $scope.user = user;

    }, function(error){
        // unauthenticated error
       // alert(JSON.stringify(error.data))
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

    $scope.$on('devise:unauthorized', function(event, xhr, deferred) {
        alert("unauthorized")
    });

}]);
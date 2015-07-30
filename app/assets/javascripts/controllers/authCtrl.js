angular.module('organizationsApp')
.controller('AuthCtrl', [
'$scope',
'$state',
'Auth',
function($scope, $state, Auth){

    $scope.login = function() {
        Auth.login($scope.user).then(function(){
            $state.go('home');
        }, function(error){
            //// Authentication failed
            $scope.loginError = "Authentication failed: \n";
            $scope.loginError += error.data.error;
        });
    };

    $scope.register = function() {
        Auth.register($scope.user).then(function(registeredUser){
            $state.go('home');

        }, function(error){
            // Registration failed
            $scope.registerError = 'Registration failed:\n';
            for(property in error.data.errors){
                $scope.registerError += property + ': ' + error.data.errors[property] + '\n';
            }
        });
    };


}]);
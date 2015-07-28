angular.module('organizationsApp', ['ui.router', 'templates', 'ngFileUpload', 'Devise'])
.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'home/_home.html',
            controller: 'HomeCtrl',

            resolve: {
                organizationPromise: ['organizations', function(organizations){
                    return organizations.getAll();
                }]
            }
        })
        .state('organizations', {
            url: '/organizations/{id}',
            templateUrl: 'organizations/_organizations.html',
            controller: 'OrganizationsCtrl',

            resolve: {
                organization: ['$stateParams', 'organizations', function($stateParams, oraganizations){
                    return oraganizations.get($stateParams.id);
                }]
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'auth/_login.html',
            controller: 'AuthCtrl',

            onEnter: ['$state', 'Auth', function($state, Auth){
                Auth.currentUser().then(function(){
                    $state.go('home');
                })
            }]
        })
        .state('register', {
            url: '/register',
            templateUrl: 'auth/_register.html',
            controller: 'AuthCtrl',

            onEnter: ['$state', 'Auth', function($state, Auth){
                Auth.currentUser().then(function(){
                    $state.go('home');
                })
            }]
        })

    $urlRouterProvider.otherwise('home');

}]);
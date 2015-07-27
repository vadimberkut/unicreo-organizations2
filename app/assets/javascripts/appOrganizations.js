angular.module('organizationsApp', ['ui.router', 'templates', 'ngFileUpload'])
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

    $urlRouterProvider.otherwise('home');

}])
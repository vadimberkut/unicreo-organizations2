angular.module('organizationsApp', ['ui.router', 'templates', 'ngFileUpload', 'Devise','appFlags'])
.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '_home.html',
            controller: 'HomeCtrl',

            resolve: {
                organizationPromise: ['organizationsFactory', function(organizationsFactory){
                    return organizationsFactory.getAll();
                }]
            }
        })
        .state('organizations', {
            url: '/organizations/{id}',
            templateUrl: '_organizations.html',
            controller: 'OrganizationsCtrl',

            resolve: {
                organization: ['$stateParams', 'organizationsFactory',
                    function($stateParams, oraganizationsFactory){
                        return oraganizationsFactory.get($stateParams.id);
                }]
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: '_login.html',
            controller: 'AuthCtrl',

            onEnter: ['$state', 'Auth', function($state, Auth){
                Auth.currentUser().then(function(){
                    $state.go('home');
                })
            }]
        })
        .state('register', {
            url: '/register',
            templateUrl: '_register.html',
            controller: 'AuthCtrl',

            onEnter: ['$state', 'Auth', function($state, Auth){
                Auth.currentUser().then(function(){
                    $state.go('home');
                })
            }]
        });

    $urlRouterProvider.otherwise('home');

}]);

angular.module('organizationsApp')
    .value('appConfig', {
        'organization_types': ['commercial', 'noncommercial', 'not specified']
    });
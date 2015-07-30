angular.module('organizationsApp')
.controller('OrganizationsCtrl',[
'$scope',
'organizationsFactory',
'organization',//single organization
'$state',
'appDataService',
'fileUploadService',
function($scope, organizationsFactory, organization, $state, appDataService, fileUploadService){

    //organization for edit
    $scope.organization = organization;

    $scope.organization_types = appDataService.organization_types;

    //files for upload
    $scope.uploadFiles = {files: []};

    $scope.cancel = function(){
        $state.go('home');
    };

    $scope.save = function(){
        organizationsFactory.update($scope.organization);
        fileUploadService.upload($scope.uploadFiles.files, '/organizations/' + $scope.organization.id + '/attachments');
        $state.go('home');
    };

}]);
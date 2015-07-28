angular.module('organizationsApp')
.controller('OrganizationsCtrl',[
'$scope',
'organizations',
'organization',//single organization
'Upload',
'$state',
function($scope, organizations, organization, Upload, $state){

    //organization for edit
    $scope.organization = organization;

    //files for upload
    $scope.uploadFiles = {files: []};

    $scope.cancel = function(){
        $state.go('home');
    };

    $scope.save = function(){
        organizations.update($scope.organization);
        $scope.upload($scope.uploadFiles.files);
        $state.go('home');
    };

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: '/organizations/' + $scope.organization.id + '/attachments',
                    fields: { },
                    file: file
                })
            }
        }
    };

}])
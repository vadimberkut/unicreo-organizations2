angular.module('organizationsApp')
.controller('OrganizationsCtrl',[
'$scope',
'$state',
'organizations',
'organization',//single organization
'Upload',
'$timeout',
'$location',
function($scope, $state, organizations, organization, Upload, $timeout, $location){

    //organization for edit
    $scope.organization = organization;

    //files for upload
    $scope.uploadFiles = {files: []};

    $scope.cancel = function(){
        $location.path('/home');
    };

    $scope.save = function(){
        organizations.update($scope.organization);
        $scope.startUploadFiles();
        $location.path('/home');
    };

    $scope.startUploadFiles = function() {

       $scope.$watch('uploadFiles.files', function () {
            $scope.upload($scope.uploadFiles.files);
        });
    };
    $scope.log = '';

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: '/organizations/' + $scope.organization.id + '/attachments',
                    fields: { },
                    file: file
                })
                .success(function (data, status, headers, config) {
                    $timeout(function() {
                        $scope.log = 'file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                    });

                });
            }
        }
    };

}])
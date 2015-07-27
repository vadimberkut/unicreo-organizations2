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

    $scope.organization = organization;

    $scope.uploadFiles = {};

    $scope.cancel = function(){
        $state.go('home');
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
                    fields: {
                        //'organization_id': $scope.organization.id
                    },
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.log = 'progress: ' + progressPercentage + '% ' +
                        evt.config.file.name + '\n' + $scope.log;
                }).success(function (data, status, headers, config) {
                    $timeout(function() {
                        $scope.log = 'file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                    });

                });
            }
        }
    };

}])
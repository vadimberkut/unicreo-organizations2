angular.module('organizationsApp')
.controller('HomeCtrl', [
'$scope',
'organizations',
        '$location',
function($scope, organizations, $location){

    $scope.organizations = organizations.organizations;
    $scope.organization = {};
    $scope.addOrganizationFlag = false;

    $scope.showAttachmentsFlags = [];

    $scope.toggleAddOrganizationFlag = function(){
        $scope.addOrganizationFlag = !($scope.addOrganizationFlag);
    }

    $scope.validateOrganization = function(organization){
        if(!organization.name || !organization.description || !organization.organization_type ||
            !organization.address || !organization.telephone){

            return false;
        }
        return true;
    }

    $scope.showAddOrganizationForm = function(){
        $scope.toggleAddOrganizationFlag();
    }


    $scope.edit = function(organization_id){
        $location.path('/organizations/' + organization_id);
    }

    $scope.deleteOrganization = function(organization){
        organizations.delete(organization);
    }

    $scope.showAttachments = function(organization){
        if(!$scope.showAttachmentsFlags[organization.id])
            $scope.showAttachmentsFlags[organization.id] = true;
        else
            $scope.showAttachmentsFlags[organization.id] =! $scope.showAttachmentsFlags[organization.id]
    }


    //form
    $scope.cancel = function(){
        $scope.toggleAddOrganizationFlag();
    }

    $scope.save = function(){

       if( !$scope.validateOrganization($scope.organization) ){
            $scope.error = "fill in all fields to save organization";
            return;
        }
        organizations.create($scope.organization).error(function(data){
            //data.errors;
        });

        $scope.organization = {};
        $scope.toggleAddOrganizationFlag();

    }

}])
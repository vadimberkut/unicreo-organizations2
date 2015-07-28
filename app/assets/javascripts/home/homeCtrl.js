angular.module('organizationsApp')
.controller('HomeCtrl', [
'$scope',
'organizations',
        '$location',
function($scope, organizations, $location){

    $scope.organizations = organizations.organizations;
    $scope.organization = {};

    $scope.error = "";

    $scope.showAddButton = true;

    //show/hide organization attachments
    $scope.showAttachmentsFlags = [];

    $scope.toggleShowAddButton = function(){
        $scope.showAddButton = !$scope.showAddButton;
    };

    $scope.validateOrganization = function(organization){
        if(!organization.name || !organization.description || !organization.organization_type ||
            !organization.address || !organization.telephone){

            return false;
        }
        return true;
    };

    $scope.showAddOrganizationForm = function(){
        $scope.toggleShowAddButton();
    };


    $scope.edit = function(organization_id){
        $location.path('/organizations/' + organization_id);
    };

    $scope.deleteOrganization = function(organization){
        organizations.delete(organization);
    };

    $scope.showAttachments = function(organization){
        if(!$scope.showAttachmentsFlags[organization.id])
            $scope.showAttachmentsFlags[organization.id] = true;
        else
            $scope.showAttachmentsFlags[organization.id] =! $scope.showAttachmentsFlags[organization.id]
    };


    //form
    $scope.cancel = function(){
        $scope.toggleShowAddButton();
        $scope.error = "";
    };

    //add organization
    $scope.save = function(){

       if( !$scope.validateOrganization($scope.organization) ){
            $scope.error = "fill in all fields to save organization";
            return;
        }
        organizations.create($scope.organization).error(function(data){
            //data.errors;
        });

        $scope.organization = {};
        $scope.toggleShowAddButton();
        $scope.error = "";

    };

    //sort
    $scope.predicate = 'name';
    $scope.reverse = false;

    $scope.sortOrder = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
    };


}]);
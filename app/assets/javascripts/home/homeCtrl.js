angular.module('organizationsApp')
.controller('HomeCtrl', [
'$scope',
'organizationsFactory',
'$location',
'Auth',
function($scope, organizationsFactory, $location, Auth){

    $scope.organizations = organizationsFactory.organizations;
    $scope.organization = {};

    $scope.showAddFormFlag = false;

    //show/hide organization attachments
    $scope.showAttachmentsFlags = [];

    $scope.validateOrganization = function(organization){
        if(!organization.name || !organization.description || !organization.organization_type ||
            !organization.address || !organization.telephone){

            return false;
        }
        return true;
    };

    //toggle show/hide add organization form
    $scope.showAddForm = function(){
        if(!Auth.isAuthenticated())
            $scope.authError = "You need to log in or register before adding.";
        else
            $scope.showAddFormFlag = !$scope.showAddFormFlag ;
    };

    $scope.edit = function(organization_id){
        if(!Auth.isAuthenticated()) {
            $scope.authError = "You need to log in or register before editing.";
        }
        else
            $location.path('/organizations/' + organization_id);
    };

    $scope.deleteOrganization = function(organization){
        if(!Auth.isAuthenticated())
            $scope.authError = "You need to log in or register before deleting.";
        else
            organizationsFactory.delete(organization);
    };

    $scope.showAttachments = function(organization){
        if(!$scope.showAttachmentsFlags[organization.id])
            $scope.showAttachmentsFlags[organization.id] = true;
        else
            $scope.showAttachmentsFlags[organization.id] =! $scope.showAttachmentsFlags[organization.id]
    };


    // reset all entered data and hide add organization form
    $scope.cancel = function(){
        $scope.showAddForm();
        $scope.organization = {};
    };

    //add organization and hide add organization form
    $scope.save = function(){

       if( !$scope.validateOrganization($scope.organization) ){
           $scope.formError = "Fill in all fields before continuing.";
           return;
        }
        organizationsFactory.create($scope.organization).error(function(data, status, headers, config) {
        });

        $scope.organization = {};
        $scope.showAddForm();
        $scope.formError = "";
    };

    //sort
    $scope.sortPredicates = ['name', 'organization_type', 'address', 'telephone', 'description'];
    $scope.predicate = 'name';
    $scope.reverse = false;

    $scope.sortOrder = function(predicate) {
        $scope.predicate = predicate;
    };

}]);
angular.module('organizationsApp')
.controller('HomeCtrl', [
'$scope',
'organizationsFactory',
'$location',
'Auth',
'showAddFormFlag',
'showAttachmentsFlags',
'appDataService',
function($scope, organizationsFactory, $location, Auth, showAddFormFlag, showAttachmentsFlags, appDataService){

    $scope.organizations = organizationsFactory.organizations;
    $scope.organization = {};

    //set app flags
    $scope.showAddFormFlag = showAddFormFlag;
    $scope.showAttachmentsFlags = showAttachmentsFlags;//show/hide organization attachments


    $scope.organization_types = appDataService.organization_types;


    $scope.validateOrganization = function(organization){
        if(!organization.name || !organization.description || !organization.organization_type ||
            !organization.address || !organization.telephone){

            return false;
        }
        return true;
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

    // reset all entered data and hide add organization form
    $scope.cancel = function(){
        $scope.showAddFormFlag.set(false);
    };

    //add organization and hide add organization form
    $scope.save = function(){

       if( !$scope.validateOrganization($scope.organization) ){
           $scope.formError = "Fill in all fields before continuing.";
           return;
        }
        organizationsFactory.create($scope.organization)
            .error(function(data, status, headers, config) {
            }
        );

        $scope.showAddFormFlag.set(false);
        $scope.organization = {};
        $scope.formError = "";
    };

    //sort
    $scope.sortPredicates = appDataService.sortPredicates;
    $scope.predicate = $scope.sortPredicates[0];
    $scope.reverse = false;

    $scope.sortOrder = function(predicate) {
        $scope.predicate = predicate;
    };
    $scope.getSortPredicate = function(){
        return $scope.predicate;
    }

}]);
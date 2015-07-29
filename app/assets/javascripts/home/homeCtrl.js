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
            alert("You must log in to add organization");
        else
            $scope.showAddFormFlag = !$scope.showAddFormFlag ;
    };

    $scope.edit = function(organization_id){
        if(!Auth.isAuthenticated())
            alert("You must log in to edit organization");
        else
            $location.path('/organizations/' + organization_id);
    };

    $scope.deleteOrganization = function(organization){
        if(!Auth.isAuthenticated())
            alert("You must log in to delete organization");
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
            alert("fill in all fields to save organization");
            return;
        }
        organizationsFactory.create($scope.organization).error(function(data){
            //alert(data.errors);
        });

        $scope.organization = {};
        $scope.showAddForm();
    };

    //sort
    $scope.sortPredicates = ['name', 'organization_type', 'address', 'telephone', 'description'];
    $scope.predicate = 'name';
    $scope.reverse = false;

    $scope.sortOrder = function(predicate) {
        $scope.predicate = predicate;
    };

}]);
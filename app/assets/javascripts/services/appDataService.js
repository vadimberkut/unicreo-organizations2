angular.module('organizationsApp').service('appDataService', [
function(){
    this.organization_types = ['commercial', 'noncommercial', 'other', 'not specified'];

    this.sortPredicates = ['name', 'organization_type', 'address', 'telephone', 'description', 'created_at', 'updated_at'];

}]);
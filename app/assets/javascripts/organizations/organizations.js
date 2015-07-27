angular.module('organizationsApp').factory('organizations', [
'$http',
function($http){

    var o = {
        organizations: []
    };

    o.getAll = function(){
        return $http.get('/organizations.json')
            .success(function(data){
                angular.copy(data, o.organizations);
            })
    };

    o.create = function(organization){
        return $http.post('/organizations.json', organization)
            .success(function(data){
                o.organizations.push(data);
            })
    };

    o.get = function(organization_id){
        return $http.get('/organizations/' + organization_id + '.json')
            .then(function(res){
                return res.data;
            })
    };

    o.update = function(organization){
        return $http.put('/organizations/' + organization.id + '.json', organization)
            .success(function(data){
                organization = data;
            })
    };

    o.delete = function(organization){
        return $http.delete('/organizations/' + organization.id + '.json', organization)
            .success(function(data){
                o.getAll();
            })
    };

    return o;
}]);
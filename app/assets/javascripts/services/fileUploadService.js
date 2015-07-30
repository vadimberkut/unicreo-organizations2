angular.module('organizationsApp').service('fileUploadService', [
'Upload',
function(Upload){

    this.upload = function (files, uploadUrl) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: uploadUrl,
                    fields: { },
                    file: file
                })
            }
        }
    };

}]);
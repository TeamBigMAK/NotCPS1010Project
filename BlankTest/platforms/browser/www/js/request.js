var postData = {"name": "MATTISAWESOME"};

var bApp = angular.module('myApp', []);

bApp.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

bApp.controller('bCtrl', [ '$scope', '$http', '$sce', function($scope, $http, $sce) {
    $http.get("http://localhost:3030/test/test.json")
    .then(function(response) {
        console.log(response.data);
        $scope.name = response.data.name;
        $scope.age = response.data.age;
        });


    // Retrrieve from main DB
    var url = "http://localhost:3030/data";
    var trustedURL = $sce.trustAsResourceUrl(url);

    $http.get(trustedURL).
        then(function(response) {

              $scope.name2 = response.data[1].word;
              $scope.name3 = response.data[3].word;

              $scope.age2 = response.data[1].age;
              $scope.age3 = response.data[3].age;

        });
}]);

var ChalMereBhai = angular.module('ChalMereBhai',['ngRoute']);
ChalMereBhai.config(['$routeProvider',function($routeProvider) {
  $routeProvider
  .when('/',{
    templateUrl: 'views/home.html'
  })
  .when('/register',{
    templateUrl: 'views/adddriver.html',
    controller : 'Homecontroller'
  })
  .when('/update',{
    templateUrl: 'views/modifydriver.html',
    controller : 'Homecontroller'
  })
  .when('/search',{
    templateUrl : 'views/search.html',
    controller : 'Homecontroller'
  })
  .when('/delete',{
    templateUrl: 'views/removedriver.html',
    controller : 'Homecontroller'
  })
  .otherwise({
    redirectTo : '/'
  });
}]);

ChalMereBhai.controller('Homecontroller',['$scope','$http',function ($scope , $http) {
  $scope.Math = window.Math;
  var error = function (err) {
    alert("Something went wrong");
  }
  $scope.search = function (lat,lng) {
    if(lat !== undefined && lng !== undefined){
        $http.get('/api/drivers?lng='+lng+'&lat='+lat).then(function(data) {
                  $scope.drivers = data.data;
               },error);
      }
  }
  $scope.adddriver = function (id,name,exp,lat,lng,avail) {
      var obj = {
            id : parseFloat(id),
            name : name,
            exp : parseFloat(exp),
            avail : avail,
            geolocation :{
              coordinates :[parseFloat(lng),parseFloat(lat)]
            }
        };
        $http.post('/api/drivers',JSON.stringify(obj)).then(function (data) {
          console.log(data);
          alert("User "+data.data.name+" registered successfully");
        },error);
    }
    $scope.deletedriver = function (id) {
      $http.delete('/api/drivers/'+id).then(function (data) {
        alert("Driver "+data.data.name+" deleted successfully");
      },error);
    }
    $scope.updatesearch = function(id) {
      $http.get('/api/drivers/'+id).then(function (data) {
        if(data.data.id === undefined){
          alert("User not found");
        }else{
          $scope.id = data.data.id;
          $scope.exp = data.data.exp;
          $scope.name = data.data.name;
          $scope.avail = data.data.avail;
          $scope.lng = data.data.geolocation.coordinates[0];
          $scope.lat = data.data.geolocation.coordinates[1];
          $scope._id = data.data._id;
        }
      },error);
    }
    $scope.updatedriver = function() {
      if($scope.id !== undefined){
         var obj = {
            id : parseFloat($scope.id),
            name : $scope.name,
            exp : parseFloat($scope.exp),
            avail : $scope.avail,
            geolocation :{
              coordinates :[parseFloat($scope.lng),parseFloat($scope.lat)]
            }
        };
      $http.put('/api/drivers/'+$scope._id,obj).then(function (data) {
          alert("User "+data.data.name+ " updated successfully");
          $scope._id = undefined;
      },error);
    }else{
      alert("please fetch detail first");
    }
    }
}]);

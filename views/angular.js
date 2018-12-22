      var App = angular.module('app',[]);
      App.controller('QuesSubmit',function($scope){
        //$scope.isvisible=false;
          //$scope.qvisible;
          $scope.submit = function(question){
            console.log(question);
            $scope.qvisible = $scope.question;
            console.log($scope.qvisible);
            $scope.question = '';
            return true;
          };
      });
    
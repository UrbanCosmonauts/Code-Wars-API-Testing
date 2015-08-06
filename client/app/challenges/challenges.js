angular.module('battlescript.challenges', [])
.controller('ChallengesController', function ($scope, Challenges) {

  // get a random challenge
  $scope.getOne = function() {
    Challenges.getOne()
      .then(function(data) {
        console.log('success');
        console.log(data);
      })
      .catch(function(err) {
        console.log('error');
        console.log(err);
      });
  };

  // run on load
  $scope.getOne();

});
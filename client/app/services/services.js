angular.module('battlescript.services', [])

// Challenges factory
.factory('Challenges', function($http) {
  
  var getChallenge = function() {
    return $http({
      method: 'GET',
      url: '/api/challenges/getchallenge',
    }).then(function(res) {
      return res.data;
    });
  };

  var submitChallenge = function() {
    return $http({
      method: 'POST',
      url: '/api/challenges/getchallenge',
    }).then(function(res) {
      return res.data;
    });
  };

  var getAllChallenges = function() {
    return $http({
      method: 'GET',
      url: '/api/challenges/getallchallenges',
    }).then(function(res) {
      return res.data;
    });
  };

  return {
    getChallenge: getChallenge,
    submitChallenge: submitChallenge,
    getAllChallenges: getAllChallenges
  }
});
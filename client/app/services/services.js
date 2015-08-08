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

  var attemptChallenge = function(projectId, solutionId) {
    return $http({
      method: 'POST',
      url: '/api/challenges/attemptchallenge',
      data: {
        code: 'This is my dummy data',
        projectId: projectId,
        solutionId: solutionId
      }
    }).then(function(res) {
      return res.data;
    });
  };

  var submitChallenge = function() {
    // TODO: Needs to be able to submit a challenge and test it
    return $http({
      method: 'POST',
      url: '/api/challenges/getchallenge'
    }).then(function(res) {
      return res.data;
    });
  };

  var getAllChallenges = function() {
    // TODO: Be able to get all challenges here
    // return $http({
    //   method: 'GET',
    //   url: '/api/challenges/getallchallenges',
    // }).then(function(res) {
    //   return res.data;
    // });
  };

  return {
    getChallenge: getChallenge,
    attemptChallenge: attemptChallenge,
    submitChallenge: submitChallenge,
    getAllChallenges: getAllChallenges
  }
});
angular.module('battlescript.services', [])

// Challenges factory
.factory('Challenges', function($http) {
  var getOne = function() {
    return $http({
      method: 'GET',
      url: '/api/challenges/getOne'
    }).then(function(res) {
      return res.data;
    });
  };

  return {
    getOne: getOne
  }
});
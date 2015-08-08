angular.module('battlescript.challenges', [])
.controller('ChallengesController', function ($scope, Challenges) {

  $scope.challenge;
  $scope.challengeDescription;

  $scope.challengeProjectId;
  $scope.challengeSolutionId;

  // set up syntax highlighting
  $scope.codeBlock = CodeMirror.fromTextArea(angular.element('.code-block')[0], {
    mode: 'javascript',
    theme: 'material',
    indentUnit: 2,
    tabSize: 4,
    lineNumbers: true
  });

  $scope.getChallenge = function() {
    Challenges.getChallenge()
      .then(function(data) {
        $scope.challenge = JSON.parse(data.body);
        $scope.challengeDescription = $scope.challenge.description;

        $scope.challengeProjectId = $scope.challenge.session.projectId;
        $scope.challengeSolutionId = $scope.challenge.session.solutionId;
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  $scope.attemptChallenge = function() {
    // TODO: Attempt challenge
    Challenges.attemptChallenge($scope.challengeProjectId, $scope.challengeSolutionId)
      .then(function(data) {
        console.log(data);
      });
  };

  $scope.submitChallenge = function() {
    // TODO: Needs to be able to submit a challenge and test it
  };

  $scope.getAllChallenges = function() {
    // TODO: Be able to get all challenges here
    Challenges.getAllChallenges()
      .then(function(data) {
        $scope.challenge = JSON.parse(data.body);
        $scope.challengeDescription = $scope.challenge.description;
      })
      .catch(function(err) {
        console.log(err);
      });
  };

});
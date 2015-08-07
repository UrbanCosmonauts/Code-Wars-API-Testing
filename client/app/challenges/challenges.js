angular.module('battlescript.challenges', [])
.controller('ChallengesController', function ($scope, Challenges) {

  $scope.challenge;
  $scope.challengeDescription;

  $scope.getChallenge = function() {
    Challenges.getChallenge()
      .then(function(data) {
        $scope.challenge = JSON.parse(data.body);
        $scope.challengeDescription = $scope.challenge.description;
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  // set up syntax highlighting
  var codeBlock = CodeMirror.fromTextArea(angular.element('.code-block')[0], {
    mode: 'javascript',
    theme: 'material',
    indentUnit: 2,
    tabSize: 4,
    lineNumbers: true
  });

  $scope.getText = function() {
    console.log(codeBlock.getValue());
  }

});
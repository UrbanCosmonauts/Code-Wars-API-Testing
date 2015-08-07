var challengesController = require('./challengesController.js');

module.exports = function (app) {
  app.get('/getchallenge', challengesController.getChallenge);
  app.get('/getallchallenges', challengesController.getAllChallenges);
  app.post('/submitchallenge', challengesController.submitChallenge);
};
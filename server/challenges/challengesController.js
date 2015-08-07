var request = require('request');

module.exports = {
  getChallenge: function(req, res) {
    console.log('-----> SERVER WORKING: Getting a challenge.');
    var options = {
      url: 'https://www.codewars.com/api/v1/code-challenges/valid-braces',
      headers: {
        'Authorization': 'TFp2KBBKWkDu_qCRyByV'
      }
    };
    
    request(options, function(error, response, body) {
      console.log('-----> SERVER WORKING: Sending response from getting a challenge.');
      res.send(response);
    });
  },

  submitChallenge: function(req, res) {
    // TODO: Needs to be able to submit a challenge and test it
  },

  getAllChallenges: function(req, res) {
    // TODO: Be able to get all challenges here
    res.send('need to somehow get all challenges');
  }
};
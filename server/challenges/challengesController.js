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

  getAllChallenges: function(req, res) {
    res.send('need to somehow get all challenges');
    // var options = {
    //   url: 'https://www.codewars.com/api/v1/code-challenges',
    //   headers: {
    //     'Authorization': 'TFp2KBBKWkDu_qCRyByV'
    //   }
    // };
    
    // request(options, function(error, response, body) {
    //   res.send(response);
    // });
  }
};
var request = require('request');

module.exports = {
  getChallenge: function(req, res) {
    var options = {
      url: 'https://www.codewars.com/api/v1/code-challenges/5513795bd3fafb56c200049e/javascript/train',
      headers: {
        'Authorization': 'TFp2KBBKWkDu_qCRyByV'
      }
    };
    
    request.post(options, function(error, response, body) {
      res.send(response);
    });
  },

  attemptChallenge: function(req, res) {
    // Init a poll counter
    var pollCounter = 0;
    
    // Poll the api
    var poll = function(dmid, body) {
      // Poll it with a get request, including the dmid
      request.get({
        url: 'https://www.codewars.com/api/v1/deferred/' + dmid,
        headers: {
          'Authorization': 'TFp2KBBKWkDu_qCRyByV'
        }
      }, function(pollError, pollResponse, pollBody) {
        pollBody = JSON.parse(pollBody); 
        if (pollBody && pollBody.success) {
          console.log('successful poll!');
          console.log(pollBody);
          res.end();
        } else {
          if (pollCounter++ >= 10) {
            console.log('-----> Too many polls...');
            res.end();
          } else {
            console.log('poll # ', pollCounter);
            setTimeout(function() {
              poll(dmid);
            }, 500);
          }
        }
      });
    };

    request.post({
      url: 'https://www.codewars.com/api/v1/code-challenges/projects/' + req.body.projectId + '/solutions/' + req.body.solutionId + '/attempt',
      json: {
        code: 'function countBy(x, n) {\nvar z = [];\nfor (i = 1; i <= n; i++) {\nz.push(x * i);\n}\nreturn z;\n}'
      },
      headers: {
        'Authorization': 'TFp2KBBKWkDu_qCRyByV'
      }
    }, function(attemptError, attemptResponse, attemptBody) {
      if (attemptError) throw new Error('-----> Error when doing initial attempt...');
      
      var dmid = attemptBody.dmid;
      poll(dmid);
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
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
    // Init some variables
    var pollCounter = 0;
    var code = req.body.code;
    var projectId = req.body.projectId;
    var solutionId = req.body.solutionId;

    // These are the initial attempt options after the user hits the "attempt"
    // button.
    var attemptOptions = {
      url: 'https://www.codewars.com/api/v1/code-challenges/projects/' + projectId +
           '/solutions/' + solutionId + '/attempt',
      json: {
        code: 'function(){var a = 3; return a;}',
        output_format: 'raw'
      },
      headers: {
        'Authorization': 'TFp2KBBKWkDu_qCRyByV'
      }
    };

    // Polling options
    var pollOptions = {
      url: 'https://www.codewars.com/api/v1/deferred/'
    };

    // Get attempt results
    var getAttemptResults = function(error, body, dmid) {

      // catch errors
      if (error) throw new Error('Error posting to server...');
      
      // initialize dmid if not exists
      var dmid = dmid || body.dmid;

      // poll the api!
      var poll = function(dmid, body) {
        // make sure we don't poll too much
        console.log(pollCounter);
        if (pollCounter++ > 20) throw new Error('Too many attempts.');

        // make a get req with the dmid
        request.get({
          url: 'https://www.codewars.com/api/v1/deferred/' + dmid,
          headers: {
            'Authorization': 'TFp2KBBKWkDu_qCRyByV'
          }
        }, function(pollError, pollResponse, pollBody) {
          console.log(pollBody);
          console.log(body, dmid);

          // check if body has been passed back in and is successfule
          if (body && body.sucess) {
            console.log(body);
            res.end('successful poll!!');
            return;
          } else {
            console.log('polling again');
            setTimeout(function() {
              poll(dmid, pollBody);
            }, 1000);
          }
        });
      };

      // do first poll
      poll(dmid);

    };


    // Make the initial request to server to begin attempting the solution.
    request.post(attemptOptions, function(error, response, body) {
      getAttemptResults(error, response.body);
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
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
        console.log(pollResponse);

        if (pollBody.success) {
          res.end('successful poll!');
        } else {
          if (pollCounter++ > 10) {
            console.log('-----> Too many polls...');
            res.end();
          } else {
            setTimeout(function() {
              poll(dmid, pollBody);
            }, 1000);
          }
        }
      });
    };

    request.post({
      url: 'https://www.codewars.com/api/v1/code-challenges/projects/' + req.body.projectId + '/solutions/' + req.body.projectId + '/attempt',
      json: {
        code: 'this is my code'
      },
      headers: {
        'Authorization': 'TFp2KBBKWkDu_qCRyByV'
      }
    }, function(attemptError, attemptResponse, attemptBody) {
      if (attemptError) throw new Error('-----> Error when doing initial attempt...');
      
      var dmid = attemptBody.dmid;
      poll(dmid);
    });


    // // START THE POLLING BACK AND FORTH TO THE CODEWARS SERVER
    // function poll(error, result, dmid) {
    //   console.log('-----> POLL ATTEMPT');

    //   var dmid;
    //   if (error) throw new Error('There was an error...');
    //   if (pollCounter++ > 20) throw new Error('Too many attempts...');

    //   dmid = dmid || result.dmid;
    //   console.log(dmid);

    //   // DO THE GET HERE
    //   request.get({
    //     url: 'https://www.codewars.com/api/v1/deferred/' + dmid,
    //     headers: {
    //       'Authorization': 'TFp2KBBKWkDu_qCRyByV'
    //     }
    //   }, function(error, response, body) {
    //     check(dmid, error, body);
    //   });
    // }

    // // KEEP CHECKING!
    // function check(dmid, error, result) {
    //   console.log(result);
    //   if (result.success) {
    //     console.log('SUCESSFUL POLL FUCKERS');
    //     res.end();
    //   }
    //   setTimeout(function() {
    //     poll(error, null, dmid);
    //   }, 1000);
    // }

    // // DO FIRST POST HERE
    // // JUST FUCKIN DO IT.
    // request.post({
    //   url: 'https://www.codewars.com/api/v1/code-challenges/projects/' + req.body.projectId +
    //        '/solutions/' + req.body.solutionId + '/attempt',
    //   json: {
    //     code: 'my attempt',
    //     output_format: 'raw'
    //   },
    //   headers: {
    //     'Authorization': 'TFp2KBBKWkDu_qCRyByV'
    //   }
    // }, function(error, response, body) {
    //   // BODY IS THE RESULT OF THE INITIAL POST.
    //   console.log('first post');
    //   console.log(body);
    //   poll(error, body);
    // });
  },

  submitChallenge: function(req, res) {
    // TODO: Needs to be able to submit a challenge and test it
  },

  getAllChallenges: function(req, res) {
    // TODO: Be able to get all challenges here
    res.send('need to somehow get all challenges');
  }
};
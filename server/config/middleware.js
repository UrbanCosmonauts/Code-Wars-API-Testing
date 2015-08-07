var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function (app, express) {
  var challengesRouter = express.Router();
  
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  app.use('/api/challenges', challengesRouter);
  require('../challenges/challengesRouter.js')(challengesRouter);
};
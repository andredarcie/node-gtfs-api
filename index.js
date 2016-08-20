module.exports = require('./lib/gtfs');
var gtfs = require('./lib/gtfs');

// Express web framework
var express = require('express');
var app = express();
var apiRoutes = express.Router();

// Routes
apiRoutes.all('*', function (req, res, next) {
  res.writeHead(200, {'Content-Type': 'text/plain', "Access-Control-Allow-Origin": "*"});
  next(); // pass control to the next handler
});

// Get a specific agency
apiRoutes.get('/agency', function(req, res) {

  var agency_id = req.query.agency_id;
  gtfs.getAgency(agency_id, function(err, agency) {
    res.end(JSON.stringify(agency));
  });
});

app.use('/api', apiRoutes);
app.listen(8124);

console.log('Server running at http://127.0.0.1:8124/');

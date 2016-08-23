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

// Routes for an agency
apiRoutes.get('/routes', function(req, res) {

  var agency_id = req.query.agency_id;
  gtfs.getRoutesByAgency(agency_id, function(err, routes) {
    res.end(JSON.stringify(routes));
  });
});

// Routes near a point
apiRoutes.get('/routesByDistance', function(req, res) {

  var lat = req.query.lat;
  var lon = req.query.lon;
  var radius = req.query.radius;
  gtfs.getRoutesByDistance(lat, lon, radius, function(err, routes) {
    res.end(JSON.stringify(routes));
  });
});

// Shapes by route
apiRoutes.get('/shapes', function(req, res) {

  var agency_key = req.query.agency_key;
  var route_id = req.query.route_id;
  var direction_id = req.query.direction_id;
  gtfs.getShapesByRoute(agency_key, route_id, direction_id, function(err, shapes) {
    res.end(JSON.stringify(shapes));
  });
});

// Stops by route
apiRoutes.get('/stops', function(req, res) {

  var agency_key = req.query.agency_key;
  var route_id = req.query.route_id;
  var direction_id = parseInt(req.query.direction_id);
  gtfs.getStopsByRoute(agency_key, route_id, direction_id, function(err, stops) {
    res.end(JSON.stringify(stops));
  });
});

app.use('/api', apiRoutes);
app.listen(8124);

console.log('Server running at http://127.0.0.1:8124/');

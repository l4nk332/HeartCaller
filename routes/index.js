var express = require('express');
var router = express.Router();
var request = require('request');
require("dotenv").load();
var request = require('request');

var apiBaseUrl = 'https://us.api.iheart.com/api';
var liveStationBrowseUrl = '/api/v2/content/liveStations';

var countryCode = 'US';
var resultsLimit = 10000;
var browseMarketUrl = '/v2/content/markets';
var url = `${apiBaseUrl}${browseMarketUrl}?${countryCode}&limit=${resultsLimit}`;
/* GET home page. */
router.get('/', function(req, res, next) {
    var topTwentyCitiesSeed = ['New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Philadelphia',
    'Phoenix',
    'San Antonio',
    'San Diego',
    'Dallas',
    'San Jose',
    'Austin',
    'Jacksonville',
    'San Francisco',
    'Indianapolis',
    'Coulmbus',
    'Fort Worth',
    'Charlotte',
    'Seattle',
    'Denver',
    'El Paso'];
    var topTwentyCitiesArr = [];
    request(url, function(err, data) {
      var dataArray = JSON.parse(data.body);
      for (var i = 0; i < dataArray.hits.length; i++) {
        if (topTwentyCitiesSeed.indexOf(dataArray.hits[i].city) !== -1) {
          topTwentyCitiesArr.push(dataArray.hits[i]);
        }
      }
      var citiesSorted = topTwentyCitiesArr.sort(function(a, b) {
        if (a.city < b.city) return -1;
        if (a.city > b.city) return 1;
        return 0;
      });
      var liveStationGenreUrl = '/v2/content/liveStationGenres';
      var countryCode2 = 'US';
      var limit2 = 10000;
      var url2 = `${apiBaseUrl}${liveStationGenreUrl}?$countryCode=${countryCode}&limit=${limit2}`;

      request(url2, function(err, data) {
        var dataArray2 = JSON.parse(data.body).hits;
        res.render('index', {cities:topTwentyCitiesArr,
                              genres:dataArray2
                              });
    // res.send('hello')
    });
  });
});

module.exports = router;

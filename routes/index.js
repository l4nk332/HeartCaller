'use strict';
var express = require('express');
var router = express.Router();
require("dotenv").load();
var request = require('request');

var apiBaseUrl = 'https://us.api.iheart.com/api';
var liveStationBrowseUrl = '/api/v2/content/liveStations';

var browseMarketUrl = '/v2/content/markets';
var liveStationGenreUrl = '/v2/content/liveStationGenres';

router.get('/', function(req, res, next){
  var countryCode = 'US';
  var resultsLimit = 10000;
  var url = `${apiBaseUrl}${browseMarketUrl}?${countryCode}&limit=${resultsLimit}`;
  var genreFullUrl = `${apiBaseUrl}${liveStationGenreUrl}?$countryCode=${countryCode}&limit=${resultsLimit}`;
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
  var citiesSorted;
  request(`${url}`, function(err, data){
    var results = JSON.parse(data.body);
    // console.log(results);
    for (var i = 0; i < results.hits.length; i++) {
      if (topTwentyCitiesSeed.indexOf(results.hits[i].city) !== -1) {
        topTwentyCitiesArr.push(results.hits[i]);
      }
    }
    var citiesSorted = topTwentyCitiesArr.sort(function(a, b) {
      if (a.city < b.city) return -1;
      if (a.city > b.city) return 1;
      return 0;
    });

    res.render('index', {cities: citiesSorted});

    // res.send('index', {cities: citiesSorted});
  });
  // res.render('index', {cities: citiesSorted});
});

module.exports = router;

'use strict';
var express = require('express');
var router = express.Router();
require("dotenv").load();
var request = require('request');

var apiBaseUrl = 'https://us.api.iheart.com/api';
var liveStationBrowseUrl = '/api/v2/content/liveStations';

var browseMarketUrl = '/v2/content/markets';

router.get('/', function(req, res, next){
  var countryCode = 'US';
  var resultsLimit = 10000;
  var url = `${apiBaseUrl}${browseMarketUrl}?${countryCode}&limit=${resultsLimit}`;
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
  request(`${url}`, function(err, body){
    body = JSON.parse(body);
    for (var i = 0; i < body.hits.length; i++) {
      if (topTwentyCitiesSeed.indexOf(body.hits[i].city) !== -1) {
        topTwentyCitiesArr.push(body.hits[i]);
      }
    }
    var citiesSorted = topTwentyCitiesArr.sort(function(a, b) {
      if (a.city < b.city) return -1;
      if (a.city > b.city) return 1;
      return 0;
    });
    return citiesSorted;
  });
});

// function topTwentyCities() {
//   var countryCode = 'US';
//   var resultsLimit = 10000;
//   var url = `${apiBaseUrl}${browseMarketUrl}?${countryCode}&limit=${resultsLimit}`;
//   var topTwentyCitiesSeed = ['New York',
//                          'Los Angeles',
//                          'Chicago',
//                          'Houston',
//                          'Philadelphia',
//                          'Phoenix',
//                          'San Antonio',
//                          'San Diego',
//                          'Dallas',
//                          'San Jose',
//                          'Austin',
//                          'Jacksonville',
//                          'San Francisco',
//                          'Indianapolis',
//                          'Coulmbus',
//                          'Fort Worth',
//                          'Charlotte',
//                          'Seattle',
//                          'Denver',
//                          'El Paso'];
//   var topTwentyCitiesArr = [];
//
//   request.get(url, function(err, res, body) {
//     body = JSON.parse(body);
//     for (var i = 0; i < body.hits.length; i++) {
//       if (topTwentyCitiesSeed.indexOf(body.hits[i].city) !== -1) {
//         topTwentyCitiesArr.push(body.hits[i]);
//       }
//     }
//     var citiesSorted = topTwentyCitiesArr.sort(function(a, b) {
//       if (a.city < b.city) return -1;
//       if (a.city > b.city) return 1;
//       return 0;
//     });
//     return citiesSorted;
//   });
//
// }

function browseGenres() {
  var liveStationGenreUrl = '/v2/content/liveStationGenres';
  var countryCode = 'US';
  var limit = 10000;
  var url = `${apiBaseUrl}${liveStationGenreUrl}?$countryCode=${countryCode}&limit=${limit}`;

  request.get(url, function(err, res, body) {
    body = JSON.parse(body);
    return body;
  });
}

module.exports = {
  topTwentyCities : topTwentyCities,
  browseGenres : browseGenres
  router: router
};

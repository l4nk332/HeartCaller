'use strict';

require("dotenv").load();
var request = require('request');

var apiBaseUrl = 'https://us.api.iheart.com/api';

// Live Station Browse - can browse by location by sending either 'marketId' or 'zipCode' with the URL

// To get the marketId you need to make a call to '/v2/content/markets'
var liveStationBrowseUrl = '/v2/api/content/liveStations';

function browseLiveStationsByZipCode(zipCode) {
  var url = `${apiBaseUrl}/${liveStationBrowseUrl}`
  request.get(url, function(err, res, body) {
    body = JSON.parse(body);
    console.log(body);
  });
}

browseLiveStationsByZipCode(94105);
// Can also browse through live stations by genre or music format

// Get genreId by calling this URL
'/v2/content/liveStationGenres';

//After you have the list of genreIds you can call this URL to get thie list of stations based on that genreIds
'/v2/content/liveStations'

"use strict";
var express = require('express');
var router = express.Router();
var request = require('request');
var splice = require('../lib/helper.js');

/* GET home page. */
router.get('/genre/:id', function(req, res, next) {
  var id = req.params.id;
  request(`https://us.api.iheart.com/api/v2/content/liveStations?countryCode=US&limit=10&genreId=${id}`, function(err,data) {
    var dataArray = JSON.parse(data.body).hits;
    var newArray = [];
    for (let i = 0; i < dataArray.length; i++) {
      let obj = {};
      let key = dataArray[i];
      obj.id = key.id;
      obj.name = key.name;
      obj.freq = key.freq;
      obj.band = key.band;
      obj.callLetters = key.callLetters;
      obj.description = key.description;
      obj.genre = key.genres[0].name;
      if(key.markets[0].city === 'Digital') {
        obj.location = 'Online Radio';
      } else {
        obj.location = `${key.markets[0].city}, ${key.markets[0].stateAbbreviation}`;
      }
      obj.logo = key.logo.splice(4,0,'s');
      obj.website = key.website;
      obj.stream = key.streams.hls_stream;
      if (obj.website) {
        if (obj.website.indexOf('www') > -1) {
          obj.website = "https://" + obj.website;
        } else {
          obj.website = "https://www." + obj.website;
        }
      }
      newArray.push(obj);
    }
    res.render('browse', {stations:newArray});
  });
});

router.get('/city/:id', function(req, res, next) {
  var id = req.params.id;
  var page = parseInt(req.query.startIndex + '0') || 1;
  request(`https://us.api.iheart.com/api/v2/content/liveStations?countryCode=US&limit=10&marketId=${id}&startIndex=${page}`, function(err,data) {
    var dataArray = JSON.parse(data.body).hits;
    var newArray = [];
    for (let i = 0; i < dataArray.length; i++) {
      let obj = {};
      let key = dataArray[i];
      obj.id = key.id;
      obj.name = key.name;
      obj.freq = key.freq;
      obj.band = key.band;
      obj.callLetters = key.callLetters;
      obj.description = key.description;
      let allGenres = [];
      for (let j = 0; j < key.genres.length; j++) {
        allGenres.push(key.genres[j].name);
      }
      obj.genres = allGenres;
      if(key.markets[0].city === 'Digital') {
        obj.location = 'Online Radio';
      } else {
        obj.location = `${key.markets[0].city}, ${key.markets[0].stateAbbreviation}`;
      }

      obj.logo = key.logo.splice(4,0,'s');
      obj.website = key.website;
      obj.stream = key.streams.hls_stream;
      if (obj.website) {
        if (obj.website.indexOf('www') > -1) {
          obj.website = "https://" + obj.website;
        } else {
          obj.website = "https://www." + obj.website;
        }
      }
      newArray.push(obj);
    }
    res.render('browse', {stations:newArray, page:page});
  });
});

module.exports = router;

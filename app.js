"use strict";

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var live = require('./routes/live');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(9090);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/live', live);
app.get('/dj_interface', function(req, res) {
  res.render(path.join("dj_interface"));
});

app.get('/browse', function(req, res) {
  res.render('browse');
  // res.sendFile(path.join(__dirname + "/public/browse.html"));
});

let stations = {};
let listeners = {};

io.on('connection', function(socket) {
  socket.on("session-start", function() {
    socket.emit("session-start", socket.id)
  });

  socket.on("dj-join", function(data) {
    stations[data.stationId] = socket.id;
    console.log("DJ joined with station ID: " + data.stationId);
  });

  socket.on("listener-join", function(data) {
    listeners[socket.id] = data.stationId;
    console.log("Listener joined " + data.stationId);
  });

  socket.on("line-open", function(data) {
    for (let socketId in listeners) {
      if (listeners[socketId] === data.stationId) {
        console.log(socketId);
        io.to(socketId).emit("line-open");
      }
    }
  });

  socket.on("line-close", function(data) {
    for (let socketId in listeners) {
      if (listeners[socketId] === data.stationId) {
        console.log(socketId);
        io.to(socketId).emit("line-close");
      }
    }
  });

  socket.on("call", function(data) {
    let stationId = listeners[data.socketId];
    let djId = stations[stationId];
    io.to(djId).emit("call", {
      username: data.username,
      songRequest: data.songRequest
    });
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

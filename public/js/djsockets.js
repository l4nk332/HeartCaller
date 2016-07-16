$(function() {
  var stationId = prompt("Please enter your station ID");
  var socket = io();
  var acceptingCalls = false;

  socket.emit("dj-join", {
    stationId: stationId
  });

  socket.on("call", function(listenerId) {
    $(".caller-list").append(`<li>${listenerId}</li>`);
  });

  $(".start-btn").on("click", function() {
    if (!acceptingCalls) {
      socket.emit("line-open", {
        stationId: stationId
      });
    } else {
      socket.emit("line-close", {
        stationId: stationId
      });
    }
    acceptingCalls = !acceptingCalls;
  });
});

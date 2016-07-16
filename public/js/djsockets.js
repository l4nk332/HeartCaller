$(function() {
  let stationId = prompt("Please enter your station ID");

  var socket = io();

  socket.emit("dj-join", {
    stationId: stationId
  });

  socket.on("call", function(listenerId) {
    $(".caller-list").append(`<li>${listenerId}</li>`);
  });

  $(".start-btn").on("click", function() {
    socket.emit("line-open", {
      stationId: stationId
    });
  });
});

$(function() {
  var stationId = prompt("Please enter your station ID");
  var socket = io();
  var acceptingCalls = false;

  socket.emit("dj-join", {
    stationId: stationId
  });

  var isEmpty = true;

  socket.on("call", function(username) {
    if (isEmpty) {
      $(".caller-status").text("Callers waiting...");
      isEmpty = false;
    }
    $(".caller-list").append(`<li>${username}</li>`);
  });

  $(".start-btn").on("click", function() {
    if (!acceptingCalls) {
      socket.emit("line-open", {
        stationId: stationId
      });
    } else {
      $(".caller-status").text("No callers yet.");
      $(".caller-list").html("");
      socket.emit("line-close", {
        stationId: stationId
      });
    }
    acceptingCalls = !acceptingCalls;
  });
});

$(function() {
  var stationId = prompt("Please enter your station ID");
  var socket = io();
  var acceptingCalls = false;

  socket.emit("dj-join", {
    stationId: stationId
  });

  var isEmpty = true;

  socket.on("call", function(data) {
    if (isEmpty) {
      $(".caller-status").text("Requests pending...");
      isEmpty = false;
    }
    $(".caller-list").append(`<li><strong>${data.username}</strong> requested <em>${data.songRequest}</em></li>`);
  });

  $(".start-btn").on("click", function() {
    if (!acceptingCalls) {
      socket.emit("line-open", {
        stationId: stationId
      });
    } else {
      $(".caller-status").text("No requests yet.");
      $(".caller-list").html("");
      socket.emit("line-close", {
        stationId: stationId
      });
    }
    acceptingCalls = !acceptingCalls;
  });
});

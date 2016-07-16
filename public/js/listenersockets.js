$(function() {
  var socket = io();
  var socketId;
  socket.emit("session-start");
  socket.on("session-start", function(sockId) {
    socketId = sockId;
  });

  $(".station").on("click", function() {
    socket.emit("listener-join", {
      stationId: $(this).attr("data-id")
    });
  });

  socket.on("line-open", function(user) {
    $(".fixed-top").removeClass("hide-alert");
  });

  socket.on("line-close", function(user) {
    $(".fixed-top").addClass("hide-alert");
  });

  $(".call-btn").on("click", function() {
    socket.emit("call", socketId);
  });
});

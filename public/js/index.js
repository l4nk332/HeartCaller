$(".station").on("click", function() {
  $(".fixed-bottom").removeClass("hide-player");
});

$(".dismiss-alert").on("click", function() {
  $(".fixed-top").toggleClass("hide-alert");
});

$(".iheart-radio-logo").on("click", function() {
  $(".fixed-top").toggleClass("hide-alert");
});

$(".play-btn").on("click", function() {
  if ($(".control-play").hasClass("glyphicon-play")) {
    $(".control-play").removeClass("glyphicon-play").addClass("glyphicon-pause");
  } else {
    $(".control-play").removeClass("glyphicon-pause").addClass("glyphicon-play");
  }
});

$(".start-btn").on("click", function() {
  $(this).toggleClass("stop-receiving");
  let buttonText = $(this).text() === "Start taking calls" ? "Stop receiving calls" : "Start taking calls";
  $(this).text(buttonText);
  if ($(".dj-container").css("display") === "none") {
    $(".dj-container").css("display", "flex");
  } else {
    $(".dj-container").css("display", "none");
  }
});

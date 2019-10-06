$(document).ready(function() {
  $(".indexJoin-bg > img").hide();
  $("#indexJoin-btn > button").hide();
  function wheel() {
    var $windowTop = $(window).scrollTop();

    if ($windowTop > $(".indexJoin").offset().top - 300) {
      $("#indexJoin-btnO , #indexJoin-ckO")
        .removeClass()
        .show()
        .addClass();
      $("#indexJoin-btnQr , #indexJoin-ckQr")
        .removeClass()
        .show()
        .addClass();
    }
  }

  // wheel();
  $(window).scroll(function() {
    wheel();
  });
});

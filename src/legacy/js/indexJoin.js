$(document).ready(function() {
  $(".indexJoin-stepOrigin > div")
    .removeClass()
    .hide();
  $(".indexJoin-stepQrcode > div")
    .removeClass()
    .hide();

  $(".indexJoin-spotlightL").hide();
  $(".indexJoin-spotlightR").hide();

  $("#indexJoin-btnO , #indexJoin-ckO").click(function() {
    $("#indexJoin-btnO").attr("disabled", "disabled");
    $("#indexJoin-btnQr").attr("disabled", "disabled");
    $(".indexJoin-spotlightR").hide();
    $(".indexJoin-spotlightL").fadeIn();

    setTimeout(() => {
      $("#indexJoin-btnO").removeAttr("disabled");
      $("#indexJoin-btnQr").removeAttr("disabled");
    }, 7700);

    $(".indexJoin-info")
      .removeClass()
      .hide();

    $(".indexJoin-stepOrigin > div")
      .stop()
      .removeClass()
      .hide();
    $(".indexJoin-stepQrcode > div")
      .stop()
      .removeClass()
      .hide();

    $(".indexJoin-stepOrigin > div")
      .eq(0)
      .addClass("indexJoin-stepO1")
      .fadeIn(100)
      .delay(3500)
      .fadeOut(100);
    $(".indexJoin-stepOrigin > div")
      .eq(1)
      .addClass("indexJoin-stepO2")
      .delay(3700)
      .fadeIn(100)
      .delay(1200)
      .fadeOut(100);
    $(".indexJoin-stepOrigin > div")
      .eq(2)
      .addClass("indexJoin-stepO3")
      .delay(6100)
      .fadeIn(100)
      .delay(1400)
      .fadeOut(50);
    $(".indexJoin-stepOrigin > div")
      .eq(3)
      .addClass("indexJoin-stepO4")
      .delay(7650)
      .fadeIn(50)
      .delay(1000);
  });

  $("#indexJoin-btnQr , #indexJoin-ckQr").click(function() {
    $("#indexJoin-btnO").attr("disabled", "disabled");
    $("#indexJoin-btnQr").attr("disabled", "disabled");
    $(".indexJoin-spotlightL").hide();
    $(".indexJoin-spotlightR").fadeIn();

    setTimeout(() => {
      $("#indexJoin-btnO").removeAttr("disabled");
      $("#indexJoin-btnQr").removeAttr("disabled");
    }, 8250);

    $(".indexJoin-info")
      .removeClass()
      .hide();

    $(".indexJoin-stepOrigin > div")
      .stop()
      .removeClass()
      .hide();
    $(".indexJoin-stepQrcode > div")
      .stop()
      .removeClass()
      .hide();

    $(".indexJoin-stepQrcode > div")
      .eq(0)
      .addClass("indexJoin-stepQr1")
      .fadeIn(100)
      .delay(1000)
      .fadeOut(50);
    $(".indexJoin-stepQrcode > div")
      .eq(1)
      .delay(300)
      .addClass("indexJoin-stepQr2")
      .fadeIn(100)
      .delay(700)
      .fadeOut(50);
    $(".indexJoin-stepQrcode > div")
      .eq(2)
      .delay(1300)
      .addClass("indexJoin-stepQr3")
      .fadeIn(100)
      .delay(2700)
      .fadeOut(100);
    $(".indexJoin-stepOrigin > div")
      .eq(1)
      .delay(4100)
      .addClass("indexJoin-stepO2")
      .fadeIn(100)
      .delay(2200)
      .fadeOut(100);
    $(".indexJoin-stepOrigin > div")
      .eq(2)
      .delay(6600)
      .addClass("indexJoin-stepO3")
      .fadeIn(100)
      .delay(1400)
      .fadeOut(100);
    $(".indexJoin-stepOrigin > div")
      .eq(3)
      .delay(8250)
      .addClass("indexJoin-stepO4")
      .fadeIn(100)
      .delay(1000);
  });
});

$(document).ready(function() {
  $(".indexMeal-confetti").click(function() {
    $(".indexMeal-confetti-after").hide();
    $(".indexMeal-confetti-left > img").addClass("indexMeal-confetti-hoverL");
    setTimeout(() => {
      $(".indexMeal-confetti-left > img").removeClass(
        "indexMeal-confetti-hoverL"
      );
      $(".indexMeal-confetti-after").show();
    }, 2000);
    $(".indexMeal-confetti-right> img").addClass("indexMeal-confetti-hoverR");
    setTimeout(() => {
      $(".indexMeal-confetti-right > img").removeClass(
        "indexMeal-confetti-hoverR"
      );
      $(".indexMeal-confetti-after").show();
    }, 2000);
  });
});

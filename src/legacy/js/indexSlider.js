//飯團
var owl = $(".owl-carousel");
owl.owlCarousel({
  loop: true,
  margin: 0,
  smartSpeed: 1000,
  // autoWidth: true,
  center: true,
  nav: true,
  responsive: {
    0: {
      items: 1,
      center: true
    },
    600: {
      items: 2,
      center: true
    },
    960: {
      items: 3
    },
    1200: {
      items: 4
    }
  }
});

owl.on("mousewheel", ".owl-stage", function(e) {
  if (e.deltaY > 0) {
    owl.trigger("next.owl");
  } else {
    owl.trigger("prev.owl");
  }
  e.preventDefault();
});

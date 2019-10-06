function loadJS(url) {
  // adding the script tag to the head
  var head = document.getElementsByTagName("head")[0];
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;

  // fire the loading
  head.appendChild(script);
}

$(document).ready(function() {
  if ($(window).width() < 840) {
    startCarousel();
  }
});

$(window).resize(function() {
  if ($(window).width() < 840) {
    startCarousel();
  }
});

function startCarousel() {
  var mySwiper = new Swiper(".swiper-container", {
    // 參數設定[註1]
    effect: "cube", // 效果
    grabCursor: true, // 游標變成手掌
    cubeEffect: {
      shadow: false, // 顯示陰影
      slideShadows: false, // 滑顯示動陰影
      shadowOffset: 20
    },
    flipEffect: {
      rotate: 30,
      slideShadows: false
    },
    navigation: {
      nextEl: null, // 上一頁按鈕物件
      prevEl: null // 下一頁按鈕物件
    },
    scrollbar: {
      el: ".swiper-scrollbar",
      hide: false
    }
  });
}

// enquire
//   .register("screen and (max-width: 840px)", {
//     match: function() {
//       // Load a mobile JS file
//       loadJS(
//         "https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.0/js/swiper.js"
//       );
//     }
//   })
//   .listen();
// enquire
//   .register("screen and (max-width: 840px)", {
//     match: function() {
//       // Load a mobile JS file
//       loadJS(
//         "https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.0/js/swiper.min.js"
//       );
//     }
//   })
//   .listen();
// enquire
//   .register("screen and (max-width: 840px)", {
//     match: function() {
//       // Load a mobile JS file
//       loadJS(
//         "https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.0/js/swiper.esm.js"
//       );
//     }
//   })
//   .listen();
// enquire
//   .register("screen and (max-width: 840px)", {
//     match: function() {
//       // Load a mobile JS file
//       loadJS(
//         "https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.0/js/swiper.esm.bundle.js"
//       );
//     }
//   })
//   .listen();

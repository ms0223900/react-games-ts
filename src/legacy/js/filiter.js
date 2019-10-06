// /*  Javascript filter
// ---------------------------------*/
// // animate divs on start
// var items = document.querySelectorAll('.food-content .food-item');
// animate(items);

// // filter on click
// each('.food-choose .food-choose_item p', function(el) {
//   el.addEventListener('click', function(e) {
//     e.preventDefault();
//     filterLinks(el);
//   });
// });

// // filter links functions
// function filterLinks(element) {
//   // get text 
//   var el = element.textContent;
//     // convert to lowercase
//   // if all remove all elements
//   if (el === '拉麵') {
//     // first show all view class
//     each('.view', function(e) {
//       e.classList.remove('view');
//     });
//     // no show init animation
//     animate(items);
//   } else {
//     // if not click all remove all elements
//     each('.view', function(e) {
//       e.classList.remove('view');
//     });
//   }
//   // show animation for current elements
//   animate(document.querySelectorAll('.' + el));
// };
// // forech arrays
// function each(el, callback) {
//   var allDivs = document.querySelectorAll(el),
//     alltoArr = Array.prototype.slice.call(allDivs);
//   Array.prototype.forEach.call(alltoArr, function(selector, index) {
//     if (callback) return callback(selector);
//   });
// };
// // animate function
// function animate(item) {
//   (function show(counter) {
//     setTimeout(function() {
//       item[counter].classList.add('view');
//       counter++;
//       if (counter < item.length) show(counter);
//     },50);
//   })(0);
// };

$(function() {
    var selectedClass = "";
    $(".food-choose .food-choose_item p").click(function(){ 
    selectedClass = $(this).attr("data-rel"); 
 $(".food-content").fadeTo(100, 0.1);
    $(".food-content .food-item").not("."+selectedClass).fadeOut().removeClass('scale-anm');
setTimeout(function() {
  $("."+selectedClass).fadeIn().addClass('scale-anm');
  $(".food-content").fadeTo(300, 1);
}, 300); 
  });
});


$(function() {
    $('.food-choose .food-choose_item').click(function(){
  
        $('.food-choose .food-choose_item').addClass('clickMe');
        $('.food-choose .food-choose_item').not(this).removeClass('clickMe');
    });
  });
// var shadow = document.querySelector("#circle");
// var circle = document.querySelector("#circle img");


//     TweenMax.to(circle, 0.4, {
//         css: { 
//             scaleX: 0.1,
//             scaleY: 0.1, 
//         }
//     });

//     shadow.addEventListener('mouseover', function(e){
//         TweenMax.to(circle, 0.6, {
//             css: { 
//               scaleX: 1,
//               scaleY: 1,
//               transformOrigin: "center bottom",
//               autoAlpha: 1 }, 
//             ease: Power2.easeOut });
//     });
//     shadow.addEventListener('mouseout', function(e){
//         TweenMax.to(circle, 0.4, {
//             css: {        
//               scaleX: 0.1,
//               scaleY: 0.1, 
//               transformOrigin: "center bottom",
//               autoAlpha: 0 }, 
//             ease: Power2.easeOut 
//     });
// });

// // shadow.onmouseover = function (e) {
    
// //     TweenMax.to(circle, 0.6, {
// //       css: { 
// //         scaleX: 1,
// //         scaleY: 1,
// //         transformOrigin: "center bottom",
// //         autoAlpha: 1 }, 
// //       ease: Power2.easeOut });
// // }

// // shadow.onmouseout = function (e) {
    
// //     TweenMax.to(circle, 0.4, {
// //       css: {        
// //         scaleX: 0.1,
// //         scaleY: 0.1, 
// //         transformOrigin: "center bottom",
// //         autoAlpha: 0 }, 
// //       ease: Power2.easeOut });
// // }
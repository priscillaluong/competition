
$( document ).ready(function() {
  $("#button1").on("click", function() {
    alert("clicked!")
    });
});

$(document).ready(function() {
  $('li.active').removeClass('active');
  $('a[href="' + location.pathname + '"]').closest('li').addClass('active');
});
  
/*
//Sticky navbar
$(document).ready(function() {
  //change the integers below to match the height of your upper dive, which I called
  //banner.  Just add a 1 to the last number.  console.log($(window).scrollTop())
  //to figure out what the scroll position is when exactly you want to fix the nav
  //bar or div or whatever.  I stuck in the console.log for you.  Just remove when
  //you know the position.
  $(window).scroll(function () {
    console.log($(window).scrollTop());
    if ($(window).scrollTop() > 100) {
      $('.navbar').addClass('navbar-fixed-top');
    }
    if ($(window).scrollTop() < 101) {
      $('.navbar').removeClass('navbar-fixed-top');
    }
=======
*/

var num = 70; //number of pixels before modifying styles

$(window).bind('scroll', function () {
    if ($(window).scrollTop() > num) {
        $('.menu').addClass('fixed');
    } else {
        $('.menu').removeClass('fixed');
    }
});

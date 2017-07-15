/*Nav bar Script */
$(document).ready(function() {
  $('li.active').removeClass('active');
  $('a[href="' + location.pathname + '"]').closest('li').addClass('active');
});

/*Makes navbar sticky when scrolling */
var num = 70; //number of pixels before modifying styles

$(window).bind('scroll', function () {
    if ($(window).scrollTop() > num) {
        $('.menu').addClass('fixed');
    } else {
        $('.menu').removeClass('fixed');
    }
});

/* Maps Script*/
function myMap() {
        var mapCanvas = document.getElementById("map");
        var myCenter = new google.maps.LatLng(51.522670,-0.085638);
        var mapOptions = {center: myCenter, zoom: 16};
        var map = new google.maps.Map(mapCanvas,mapOptions);
        var infowindow = new google.maps.InfoWindow({});
        var icon = {
        url: "images/cosmea-Flower.png",
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0),
        };
        var marker = new google.maps.Marker({
         position: new google.maps.LatLng(51.522670,-0.085638),
         icon: icon,
         optimized: false,
         animation:google.maps.Animation.BOUNCE,
        });
          marker.setMap(map);
         google.maps.event.addListener(marker,'click',function() {
         var infowindow = new google.maps.InfoWindow({
         content:"Baxters. Make someone happy."
        });
      infowindow.open(map,marker);
      });
    }

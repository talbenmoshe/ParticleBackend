/**
 * Created by talbm on 16/05/2016.
 */

var map;
var marker;
function initMap() {
    setTimeout(function () {

        var myLatlng = new google.maps.LatLng(-25.363882, 131.044922);
        var mapOptions = {
            zoom: 15,
            center: myLatlng
        }
        map = new google.maps.Map(document.getElementById("map"), mapOptions);

        marker = new google.maps.Marker({
            position: myLatlng,
            title: "Hello World!"
        });

        // To add the marker to the map, call setMap();
        marker.setMap(map);
    }, 1000);
}

function dododo(data) {
    if (marker && map) {
        var parts = data.split(",");

        var lat = parseFloat(parts[0], 10);
        var lon = parseFloat(parts[1], 10);
        marker.setPosition(new google.maps.LatLng(lat, lon));
        marker.setLabel(parts[2]);
        map.panTo(new google.maps.LatLng(lat, lon));
    }
}

$(document).ready(function () {
    var width = 0;
    var height = 0;
    if (Wix) {
        setInterval(function () {
            Wix.getBoundingRectAndOffsets(function (data) {
                if (width !== data.rect.width || height !== data.rect.height) {
                    width = data.rect.width;
                    height = data.rect.height;
                    $("#map").height(height).width(width);
                }
            });
        }, 1000);
    }
});
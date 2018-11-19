class Gmaps {

    constructor(comp, config) {
        this.map = new google.maps.Map(comp, config ? config : {
            center: {
                lat: -13.702797,
                lng: -69.6865109
            },
            zoom: 4
        });

        this.infoWindow = new google.maps.InfoWindow();

        this.map.addListener('click', function () {
            this.infoWindow.close();
        }.bind(this));
    }

    addMaker(config) {
        var marker = new google.maps.Marker(config);

        //-> Circle
        if (config.radius) {
            var circle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: this.map,
                center: marker.getPosition(),
                radius: config.radius
            });

            marker.bindTo('position', circle, 'center');
        }

        //-> InfoWindow
        if (marker.content) {
            marker.addListener('click', function (map) {
                this.infoWindow.close();
                this.infoWindow.setContent(marker.content);
                this.infoWindow.open(this.map, marker);
            }.bind(this));
        }

        marker.setMap(this.map);

        return marker;
    }
}
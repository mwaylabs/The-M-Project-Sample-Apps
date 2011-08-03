// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.7-1
//
// Project: MapSample
// Controller: MapController
// ==========================================================================

MapSample.MapController = M.Controller.extend({

    markers: null,

    textFieldValue: null,

    init: function(isFirstTime) {
        if(isFirstTime) {

            M.ViewManager.getView('page', 'map').initMap({});
            
        }
    },

    applyDB: function() {
        M.ViewManager.getView('page', 'map').updateMap({
            initialLocation: M.Location.init(48.778495, 9.180951),
            zoomLevel: 12,
            markerAnimationType: M.MAP_MARKER_ANIMATION_DROP
        });

        var map = M.ViewManager.getView('page', 'map');
        var locations = [
            M.MapMarkerView.init({
                location: M.Location.init(48.778495, 9.180951),
                map: map,
                title: 'Marker 1',
                message: 'I am marker 1. Welcome to my annotation!'
            }),
            M.MapMarkerView.init({
                location: M.Location.init(48.777534, 9.170566),
                map: map,
                title: 'Marker 2',
                message: 'I am marker 2. Welcome to my annotation!'
            }),
            M.MapMarkerView.init({
                location: M.Location.init(48.772273, 9.185328),
                map: map,
                title: 'Marker 3',
                message: 'I am marker 3. Welcome to my annotation!'
            }),
            M.MapMarkerView.init({
                location: M.Location.init(48.783303, 9.169793),
                map: map,
                title: 'Marker 4',
                message: 'I am marker 4. Welcome to my annotation!'
            }),
            M.MapMarkerView.init({
                location: M.Location.init(48.783529, 9.194856),
                map: map,
                title: 'Marker 5',
                message: 'I am marker 5. Welcome to my annotation!'
            })
        ];

        this.set('markers', locations);
    },

    findMe: function() {
        M.LoaderView.show('Looking for you ...');

        M.LocationManager.getLocation(this, this.onSuccess, this.onError, {
            maximumAge: 0,
            timeout: 10000,
            accuracy: 500
        });
    },

    onSuccess: function(location) {
        M.LoaderView.hide();

        this.location = location;

        M.ViewManager.getView('page', 'map').updateMap({
            initialLocation: location,
            zoomLevel: 14,
            setMarkerAtInitialLocation: YES,
            markerAnimationType: M.MAP_MARKER_ANIMATION_DROP
        });
    },

    onError: function(error) {
        M.LoaderView.hide();

        M.DialogView.alert({
            title: 'Error: ' + error,
            message: 'An error occured while trying to find your location. Please check your service and try again later.'
        });
    },

    lookUp: function() {
        var input = M.ViewManager.getView('page', 'textfield').value;

        if(!input || input === '') {
            M.DialogView.alert({
                title: 'Error',
                message: 'Please enter a valid address.'
            });
        } else {
            M.LoaderView.show('Looking up your location ...');
            M.LocationManager.getLocationByAddress(this, this.lookUpSuccess, this.lookUpError, input);
        }
    },

    lookUpSuccess: function(location) {
        M.LoaderView.hide();

        M.ViewManager.getView('page', 'map').updateMap({
            initialLocation: location,
            zoomLevel: 14,
            setMarkerAtInitialLocation: YES,
            markerAnimationType: M.MAP_MARKER_ANIMATION_DROP,
            isDraggable: YES
        });
    },

    lookUpError: function(error) {
        M.LoaderView.hide();

        M.DialogView.alert({
            title: 'Error: ' + error,
            message: 'An error occured while trying to lookup the entered location. Please check both your service and your input, then try again.'
        });
    },

    markerClicked: function(marker) {
        if(marker) {
            /* do something with the marker */
        }
    }

});
/*global demoapp*/

demoapp.Views = demoapp.Views || {};

(function() {
    'use strict';

    demoapp.Views.MenuView = M.View.extend({
        // The properties of a view

        // The view should be in a grid
        grid: 'col-xs-12',
        // Every view has a value
        value: 'Menu'
    }, {
        // The childViews

        // Add a button to navigate to the MenuView
        button: M.ButtonView.extend({
            // The Text of the Button
            value: 'To the Detail View',
            // The events of the button
            events: {
                // On tab call the scope method 'gotoMenuPage' (scope is the DetailController)
                tap: 'gotoDetailView'
            }
        })
    });

})();

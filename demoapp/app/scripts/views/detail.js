/*global demoapp*/

demoapp.Views = demoapp.Views || {};

(function() {
    'use strict';

    demoapp.Views.DetailView = M.View.extend({
        // The properties of a view

        // The view should be in a grid
        grid: 'col-xs-12',
        // Every view has a value
        value: 'Detail'
    }, {
        // The childViews

        // Add a button to navigate to the MenuView
        button: M.ButtonView.extend({
            // The Text of the Button
            value: 'Back to the Menu',
            // The events of the button
            events: {
                // On tab call the scope method 'gotoMenuPage' (scope is the DetailController)
                tap: 'gotoMenuView'
            }
        })
    });

})();

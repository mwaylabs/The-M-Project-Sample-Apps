/*global kitchensink*/

kitchensink.Views = kitchensink.Views || {};

(function() {
    'use strict';

    kitchensink.Views.SplitView = M.View.extend({
        // The properties of a view

        // The views grid
        grid: 'col-xs-12'
    }, {
        // The childViews as object
        backButton: M.ButtonView.extend({
            grid: 'col-xs-8 col-xs-offset-2',
            value: 'Back to the Kitchensink Menu',
            events: {
                tap: function() {
                    // Go back to the MenuController
                    kitchensink.navigate({
                        route: ''
                    });
                }
            }
        })
    });

})();

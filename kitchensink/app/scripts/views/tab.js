/*global kitchensink, M*/

kitchensink.Views = kitchensink.Views || {};

(function() {
    'use strict';

    kitchensink.Views.TabView = M.View.extend({

    }, {
        tooltip: M.TextView.extend({
            value: 'Drag to change the Tab',
            grid: 'col-xs-12',
            cssClass: 'inner-content stencil',
            icon: 'fa-arrows-h'
        }),
        backButton: M.ButtonView.extend({
            grid: 'col-xs-8 col-xs-offset-2',
            value: 'Back to the Kitchensink Menu',
            events: {
                tap: function() {
                    kitchensink.navigate({
                        route: ''
                    });
                }
            }
        }),

        tooltipScrollDown: M.TextView.extend({
            value: 'A tab is also scrollable',
            grid: 'col-xs-12',
            cssClass: 'inner-content stencil',
            icon: 'fa-long-arrow-down'
        }),

        tooltipScrollUp: M.TextView.extend({
            value: 'A tab is also scrollable',
            grid: 'col-xs-12',
            cssClass: 'inner-content stencil scroll-up',
            icon: 'fa-long-arrow-up'
        })
    })

})();

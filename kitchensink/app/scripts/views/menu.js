/*global kitchensink*/

kitchensink.Views = kitchensink.Views || {};

(function() {
    'use strict';

    kitchensink.Views.MenuView = M.View.extend({

    }, {

        // The main navigation for the kitchensink app
        menu: M.ListView.extend({
            scopeKey: 'tmpViews',
            listItemView: M.ListItemView.extend({
                type: M.ListItemView.CONST.LINKED,
                events: {
                    tap: 'gotoPage'
                }
            })
        }),

        // Debug hint
        info: M.TextView.extend({
            value: 'Shake to toggle the DebugView',
            grid: 'col-xs-12',
            cssClass: 'stencil',
            icon: 'fa-bug'
        })
    });

})();

/*global kitchensink*/

kitchensink.Views = kitchensink.Views || {};

(function() {
    'use strict';

    kitchensink.Views.MenuView = M.View.extend({

    }, {
        menu: M.ListView.extend({
            scopeKey: 'tmpViews',
            listItemView: M.ListItemView.extend({
                type: M.ListItemView.CONST.LINKED,
                events: {
                    tap: 'gotoPage'
                }
            })
        }),

        info: M.TextView.extend({
            value: 'Shake to toggle the DebugView',
            grid: 'col-xs-12',
            cssClass: 'stencil',
            icon: 'fa-bug'
        })
    });

})();

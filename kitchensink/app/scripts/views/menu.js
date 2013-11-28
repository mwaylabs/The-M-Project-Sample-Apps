/*global kitchensink, M*/

kitchensink.Views = kitchensink.Views || {};

(function() {
    'use strict';

    kitchensink.Views.MenuView = M.View.extend({}, {
        content: M.View.extend({
            grid: 'row'
        }, {
            menu: M.ListView.extend({

                grid: 'col-xs-12',

                scopeKey: 'tmpViews',

                listItemView: M.ListItemView.extend({
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
        })
    });

})();

/*global kitchensink, M*/

kitchensink.Views = kitchensink.Views || {};

(function() {
    'use strict';

    kitchensink.Views.MenuView = M.View.extend({}, {
        content: M.View.extend({
            grid: 'row'
        }, {
            listExample: M.ListView.extend({

                grid: 'col-xs-12',

                scopeKey: 'tmpViews',

                listItemView: M.ListItemView.extend({
                    events: {
                        tap: 'gotoPage'
                    }
                })

            })
        })
    });

})();

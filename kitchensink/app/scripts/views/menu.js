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
        })

    });

})();

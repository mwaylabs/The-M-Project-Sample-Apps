/*global kitchensink*/

kitchensink.Views = kitchensink.Views || {};

(function() {
    'use strict';

    kitchensink.Views.SplitMenu = M.View.extend({

    }, {

        // The main navigation for the kitchensink app
        menu: M.ListView.extend({
            scopeKey: 'splitMenu',
            listItemView: M.ListItemView.extend({
                type: M.ListItemView.CONST.LINKED,
                events: {
                    tap: 'gotoSplitPage'
                }
            })
        })
    });

})();

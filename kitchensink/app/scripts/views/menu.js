/*global kitchensink*/

kitchensink.Views = kitchensink.Views || {};

(function() {
    'use strict';

    kitchensink.Views.MenuView = M.MenuView.extend({
        onOpen: function(){
            $('body').addClass('menu-open');
        },

        onClose: function(){
            $('body').removeClass('menu-open');
        }
    }, {

        // The main navigation for the kitchensink app
        "menu-content": M.ListView.extend({
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

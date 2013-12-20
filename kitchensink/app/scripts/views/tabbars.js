/*global kitchensink, M*/

kitchensink.Views = kitchensink.Views || {};

(function() {
    'use strict';

    kitchensink.Views.TabbarsView = M.View.extend({
        grid: 'col-xs-12'
    }, {

        tabbars: M.ListView.extend({

            grid: 'row',

            value: M.Collection.create([
                {value: 'Tabbar without scrolling', tabbarExample: 1},
                {value: 'Tabbar with scrolling', tabbarExample: 2}
            ]),

            listItemView: M.ListItemView.extend({
                type: M.ListItemView.CONST.LINKED,
                events: {
                    tap: 'gotoTabbarExample'
                }
            })

        })

    });

})();

/*global kitchensink*/

kitchensink.Views = kitchensink.Views || {};

(function() {
    'use strict';

    kitchensink.Views.MovablesView = M.View.extend({
        grid: 'col-xs-12'
    }, {

        menuView: M.MovableView.extend({
            value: 'drag me'
        }),

        toggleMenuButton: M.ButtonView.extend({
            value: 'toggle movable',
            events: {
                tap: function(event, element){
                    element.scope.contentView.childViews.menuView.toggle();
                }
            }
        })

    });

})();

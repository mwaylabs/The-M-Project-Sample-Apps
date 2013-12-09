/*global kitchensink*/

kitchensink.Views = kitchensink.Views || {};

(function() {
    'use strict';

    kitchensink.Views.MovablesView = M.View.extend({
        grid: 'col-xs-12 has-menu'
    }, {

        movableView: M.MovableView.extend({
            value: 'drag me'
        }),

        toggleMenuButton: M.ButtonView.extend({
            value: 'toggle movable',
            events: {
                tap: function(event, element){
                    element.scope.contentView.childViews.movableView.toggle();
                }
            }
        }),

//        menuView: M.MenuView.extend({
//            icon: 'fa-bars'
//        }, {
//
//            'menu-content': M.View.extend({
//                value: 'menu entry'
//            }, {
//                menuEntry1: M.ButtonView.extend({
//                    value: 'menu entry 1'
//                }),
//
//                menuEntry2: M.ButtonView.extend({
//                    value: 'menu entry 2'
//                })
//            })
//        })

    });

})();

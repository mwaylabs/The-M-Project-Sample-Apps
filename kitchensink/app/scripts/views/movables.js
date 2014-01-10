/*global kitchensink*/

kitchensink.Views = kitchensink.Views || {};

(function() {
    'use strict';

    kitchensink.Views.MovablesView = M.View.extend({
        grid: 'col-xs-12 has-menu movable-bg'
    }, {

        movableView: M.MovableView.extend({
            cssClass: 'movable-cloud',
            extendTemplate: '<i class="fa fa-cloud"></i>'
        }),

        toggleMenuButton: M.ButtonView.extend({
            value: 'toggle movable',
            events: {
                tap: function(event, element){
                    element.scope.contentView.childViews.movableView.toggle();
                }
            }
        }),

        movableViewSmall: M.MovableView.extend({
            cssClass: 'movable-cloud',
            extendTemplate: '<i class="fa fa-cloud"></i>',
            leftEdge: 100,
            rightEdge: 200
        }),

        toggleMenuButtonForSmall: M.ButtonView.extend({
            value: 'toggle movable',
            events: {
                tap: function(event, element){
                    element.scope.contentView.childViews.movableViewSmall.toggle();
                }
            }
        }),

        movableViewOnRelease: M.MovableView.extend({
            cssClass: 'movable-cloud',
            extendTemplate: '<i class="fa fa-cloud"></i>',
            onRelease: function(){
                console.log('asdf');
            }
        })

    });

})();

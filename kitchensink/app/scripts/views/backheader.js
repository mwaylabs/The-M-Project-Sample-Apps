/*global kitchensink*/

kitchensink.Views = kitchensink.Views || {};

(function() {
    'use strict';

    kitchensink.Views.BackheaderView = M.View.extend({
        scopeKey: 'pageHeadline'
    },{

        first: M.ButtonView.extend({
            cssClass:'first',
            value: 'back',
            events: {
                tap: function(){
                    kitchensink.navigate({
                        route: '/',
                        transition: M.PageTransitions.CONST.MOVE_TO_RIGHT_FROM_LEFT
                    });
                }
            }
        })

    });
})();

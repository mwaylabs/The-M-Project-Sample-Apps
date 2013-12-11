/*global kitchensink*/

kitchensink.Views = kitchensink.Views || {};

(function() {
    'use strict';

    kitchensink.Views.BackheaderView = M.ToolbarView.extend({
        scopeKey: 'pageHeadline'
    },{

        first: M.ButtonView.extend({
            value: 'back',
            events: {
                tap: function(){
                    kitchensink.navigate({
                        route: '/',
                        transition: M.PageTransitions.CONST.MOVE_TO_RIGHT_FROM_LEFT
                    });
                }
            }
        }),

        second: M.ButtonView.extend({
            value: '',
            icon: 'fa-github',
            events: {
                tap: function(event, element){
                    var url = element.scope.getSourceCodeUrl();
                    window.open(url, '_blank');
                }
            }
        })

    });
})();

kitchensink.Views = kitchensink.Views || {};

(function() {
    'use strict';

    kitchensink.Views.ToggleMenuButton = M.ButtonView.extend({
        icon: 'fa-bars',
        cssClass: 'menu-button',
        events: {
            tap: 'toggleMenu'
        }
    })
})(this);
/*global kitchensink*/

kitchensink.Controllers = kitchensink.Controllers || {};

(function() {
    'use strict';

    kitchensink.Controllers.ButtonsController = kitchensink.Controllers.AbstractController.extend({

        pageHeadline: 'Buttons',

        _initViews: function() {

            if( !this.contentView ) {
                this.contentView = kitchensink.Views.ButtonsView.create(this, null, true);
            }
            if( !this.headerView ) {
                this.headerView = kitchensink.Views.BackheaderView.create(this, null, true);
            }

            this._applyViews();
        },

        registerToMenu: function( menuController ) {
            menuController.registerMenuItem({
                _value_: 'M.ButtonView',
                goto: 'buttons'
            });
        }

    });

})();

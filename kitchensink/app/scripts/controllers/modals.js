/*global kitchensink, M*/

kitchensink.Controllers = kitchensink.Controllers || {};

(function() {
    'use strict';

    kitchensink.Controllers.ModalsController = kitchensink.Controllers.AbstractController.extend({

        pageHeadline: 'Modals',

        _initViews: function() {
            if( !this.contentView ) {
                this.contentView = kitchensink.Views.ModalsView.create(this, null, true);
            }
            if( !this.headerView ) {
                this.headerView = kitchensink.Views.BackheaderView.create(this, null, true);
            }

            this._applyViews();
        },

        registerToMenu: function( menuController ) {
            menuController.registerMenuItem({
                _value_: 'M.ModalView',
                goto: 'modals'
            });
        }
    });

})();

/*global kitchensink*/

kitchensink.Controllers = kitchensink.Controllers || {};

(function() {
    'use strict';

    kitchensink.Controllers.MovablesController = kitchensink.Controllers.AbstractController.extend({

        pageHeadline: 'Movables',

        _initViews: function() {
            if( !this.contentView ) {
                this.contentView = kitchensink.Views.MovablesView.create(this, null, true);
            }
            if( !this.headerView ) {
                this.headerView = kitchensink.Views.BackheaderView.create(this, null, true);
            }

            this._applyViews();
        },

        registerToMenu: function( menuController ){
            menuController.registerMenuItem({
                _value_: 'Movables',
                goto:'movables'
            });
        }
    });

})();

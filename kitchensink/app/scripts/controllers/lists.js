/*global kitchensink, M*/

kitchensink.Controllers = kitchensink.Controllers || {};

(function() {
    'use strict';

    kitchensink.Controllers.ListsController = kitchensink.Controllers.AbstractController.extend({

        pageHeadline: 'Lists',

        _initViews: function() {
            if( !this.contentView ) {
                this.contentView = kitchensink.Views.ListsView.create(this, null, true);
            }
            if( !this.headerView ) {
                this.headerView = kitchensink.Views.BackheaderView.create(this, null, true);
            }

            this._applyViews();
        },

        registerToMenu: function( menuController ) {
            menuController.registerMenuItem({
                _value_: 'M.ListView',
                goto: 'lists'
            });
        }

    });

})();

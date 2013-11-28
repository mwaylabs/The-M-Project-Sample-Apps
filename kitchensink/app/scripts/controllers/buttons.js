/*global kitchensink, M*/

kitchensink.Controllers = kitchensink.Controllers || {};

(function() {
    'use strict';

    kitchensink.Controllers.ButtonsController = kitchensink.Controllers.AbstractController.extend({

        _initViews: function() {
            if( !this.contentView ) {
                this.contentView = kitchensink.Views.ButtonsView.create(this, null, true);
            }
            if( !this.headerView ) {
                this.headerView = kitchensink.Views.BackheaderView.create(this, null, true);
            }

            this._applyViews();
        }

    });

})();

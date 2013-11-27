/*global kitchensink, M*/

kitchensink.Controllers = kitchensink.Controllers || {};

(function() {
    'use strict';

    kitchensink.Controllers.ButtonsController = kitchensink.Controllers.FormsController.extend({

        _initViews: function() {
            if( !this.content ) {
                this.content = kitchensink.Views.ButtonsView.create(this, null, true);
            }
            if( !this.header ) {
                this.header = kitchensink.Views.BackheaderView.create(this, null, true);
            }

            this._applyViews();
        }

    });

})();

/*global kitchensink, M*/

kitchensink.Controllers = kitchensink.Controllers || {};

(function() {
    'use strict';

    kitchensink.Controllers.AbstractController = M.Controller.extend({

        headerView: null,
        contentView: null,

        /**
         * The application start (after reload)
         */
        applicationStart: function() {
            var _layout = M.SwitchHeaderContentLayout.design(this, null, true);
            kitchensink.setLayout(_layout);
            this._initViews();
        },

        show: function( settings ) {
            this._initViews();
            kitchensink.getLayout().startTransition();
        },

        _applyViews: function() {
            kitchensink.getLayout().applyViews({
                header: this.headerView,
                content: this.contentView
            });
        },

        _initViews: function() {
            // OVERRIDE ME PLEASE
        }
    });

})();

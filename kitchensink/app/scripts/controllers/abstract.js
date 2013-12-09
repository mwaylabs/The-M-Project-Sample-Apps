/*global kitchensink*/

kitchensink.Controllers = kitchensink.Controllers || {};

(function() {
    'use strict';

    kitchensink.Controllers.AbstractController = M.Controller.extend({

        headerView: null,
        contentView: null,
        pageHeadline: '',

        /**
         * The application start (after reload)
         */
        applicationStart: function(settings) {
            var _layout = M.SwitchMenuHeaderContentLayout.extend({}).create(this, null, true);
            kitchensink.setLayout(_layout);
            this._initViews(settings);
        },

        show: function(settings) {
            this._initViews(settings);
            var _layout = M.SwitchMenuHeaderContentLayout.extend({}).create(this, null, true);
            if(_layout._type === kitchensink.getLayout()._type){
                kitchensink.getLayout().startTransition();
            } else {
                this.applicationStart();
            }


        },

        applicationReady: function(){
            this.registerToMenu(kitchensink.router.menuController);
        },

        _applyViews: function() {
            kitchensink.getLayout().applyViews({
                header: this.headerView,
                content: this.contentView
            });
        },

        _initViews: function() {
            // OVERRIDE ME PLEASE
        },

        registerToMenu: function(){
            // OVERRIDE ME PLEASE
        }
    });

})();

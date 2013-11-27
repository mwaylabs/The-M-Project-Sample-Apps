/*global kitchensink, M*/

kitchensink.Controllers = kitchensink.Controllers || {};

(function() {
    'use strict';

    kitchensink.Controllers.FormsController = M.Controller.extend({

        person: M.Model.create({
            name: 'egon',
            birthday: '1383751054966',
            favorite: NO
        }),

        bindingTestModel: M.Model.create({
            a: 'first attribute',
            b: 'second attribute'
        }),

        selectionListModel: M.Model.create({water: 'evian'}),

        multipleSelectionListModel: M.Model.create({water: ['evian']}),

        content: null,

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

        _initViews: function() {
            if( !this.content ) {
                this.content = kitchensink.Views.FormsView.create(this, null, true);
            }
            if( !this.header ) {
                this.header = kitchensink.Views.BackheaderView.create(this, null, true);
            }

            this._applyViews();
        },

        _applyViews: function() {
            kitchensink.getLayout().applyViews({
                header: this.header,
                content: this.content
            });
        }
    });

})();

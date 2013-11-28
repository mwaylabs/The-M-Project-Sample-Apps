/*global kitchensink, M*/

kitchensink.Controllers = kitchensink.Controllers || {};

(function() {
    'use strict';

    kitchensink.Controllers.FormsController = kitchensink.Controllers.AbstractController.extend({

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

        _initViews: function() {
            if( !this.contentView ) {
                this.contentView = kitchensink.Views.FormsView.create(this, null, true);
            }
            if( !this.headerView ) {
                this.headerView = kitchensink.Views.BackheaderView.create(this, null, true);
            }

            this._applyViews();
        },

        registerToMenu: function( menuController ){
            menuController.registerMenuItem({
                _value_: 'Form Views',
                goto:'forms'
            });
        }
    });

})();

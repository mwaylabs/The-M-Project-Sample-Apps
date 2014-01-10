/*global kitchensink*/

kitchensink.Controllers = kitchensink.Controllers || {};

(function() {
    'use strict';

    kitchensink.Controllers.FormsController = kitchensink.Controllers.AbstractController.extend({

        pageHeadline: 'Form',

        sourceCodePath: 'scripts/views/forms.js',

        // Create a model instance with the given attributes
        person: M.Model.create({
            name: 'egon',
            birthday: '1383751054966',
            favorite: NO
        }),

        // Holds the selected item from the M.SelectView
        selectionListModel: M.Model.create({water: 'evian'}),

        // Holds the selected item from the multiple M.SelectView
        multipleSelectionListModel: M.Model.create({water: ['evian']}),

        wifi: M.Model.create(),

        _initViews: function() {

            // Create the ContentView with the controller (this) as scope
            if( !this.contentView ) {
                this.contentView = kitchensink.Views.FormsView.create(this, null, true);
            }

            // Create the HeaderView with the controller (this) as scope
            if( !this.headerView ) {
                this.headerView = kitchensink.Views.BackheaderView.create(this, null, true);
            }

            this._applyViews();

            var data = M.Model.create({
                wifi: 'online'
            });
            this.set('wifi', data);
        },

        // Register menu item for this view
        registerToMenu: function( menuController ){
            menuController.registerMenuItem({
                value: 'Form Views',
                goto:'forms'
            });
        }
    });

})();

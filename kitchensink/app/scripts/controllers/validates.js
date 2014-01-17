/*global kitchensink, Backbone*/

kitchensink.Controllers = kitchensink.Controllers || {};

(function () {
    'use strict';

    kitchensink.Controllers.ValidatesController = kitchensink.Controllers.AbstractController.extend({

        pageHeadline: 'Validation',

        sourceCodePath: 'scripts/views/validates.js',

//        multipleSelectionListModel: M.Model.create({water: ['evian']}),

        wifi: M.Model.create({
        }),

        validationModel: new (Backbone.Model.extend({
            sync: function(){

            },
            validate: function(){
            }
        }))(),
//    .create({
//            email: ''
//
//        }),

        validateText1: function(){

            var view = kitchensink.router.validatesController.contentView.childViews.text1;

            var val = view.getValue();

            if(val !== 'qwertz'){
                view.showError('not qwertz');
            } else {
                view.hideError();
            }
        },

        validateAllViews: function(){
            this.validateText1();
            this.validateText2();
        },

        _initViews: function() {

            // Create the ContentView with the controller (this) as scope
            if( !this.contentView ) {
                this.contentView = kitchensink.Views.ValidatesView.create(this, null, true);
            }

            // Create the HeaderView with the controller (this) as scope
            if( !this.headerView ) {
                this.headerView = kitchensink.Views.BackheaderView.create(this, null, true);
            }

            this._applyViews();

            var data = M.Model.create({
                wifi: 'off'
            });
            this.set('wifi', data);
        },

        // Register menu item for this view
        registerToMenu: function( menuController ) {
            menuController.registerMenuItem({
                value: 'Validation',
                goto: 'validates'
            });
        }
    });

})();

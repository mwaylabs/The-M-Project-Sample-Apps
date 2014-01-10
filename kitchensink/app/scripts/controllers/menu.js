/*global kitchensink*/

kitchensink.Controllers = kitchensink.Controllers || {};

(function() {
    'use strict';

    kitchensink.Controllers.MenuController = kitchensink.Controllers.AbstractController.extend({

        tmpViews: null,

        sourceCodePath: 'scripts/views/menu.js',

        registerMenuItem: function( menuEntry ){
            this._initMenu();
            this.tmpViews.add(menuEntry);
        },

        _initViews: function(){
             //Init the collection
            this._initMenu();

            // Create the menuView with the controller (this) as scope
            if( !this.contentView ) {
                this.contentView = kitchensink.Views.StartScreenView.create(this, null, true);
            }

            // Create the HeaderView with the controller (this) as scope
            if( !this.headerView ) {
                this.headerView = M.ToolbarView.extend({
                    grid: 'col-md-12',
                    value: 'Kitchensink'
                }).create();
            }

            this._applyViews();
        },

        _initMenu: function(){
            if( !this.tmpViews ) {
                this.tmpViews = kitchensink.Collections.TmpviewsCollection.create([]);
            }
        },

        gotoPage: function( event, element ) {

            var goto = element.model.get('goto');

            kitchensink.navigate({
                route: goto
            });

        }

    });

})();

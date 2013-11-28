/*global kitchensink, M*/

kitchensink.Controllers = kitchensink.Controllers || {};

(function() {
    'use strict';

    kitchensink.Controllers.MenuController = kitchensink.Controllers.AbstractController.extend({

        tmpViews: null,

        registerMenuItem: function( menuEntry ){
            this._initMenu();
            this.tmpViews.add(menuEntry)
        },

        _initViews: function(){

             //Init the collection
            this._initMenu();
            //create the menu
            if( !this.contentView ) {
                this.contentView = kitchensink.Views.MenuView.create(this, null, true);
            }

            if( !this.headerView ) {
                this.headerView = M.View.extend({
                    tagName: 'h2',
                    grid: 'col-md-12',
                    value: M.I18N.get('global.appName', {aka: 'Absinth'})
                }).create()
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

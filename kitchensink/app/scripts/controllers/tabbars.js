/*global kitchensink*/

kitchensink.Controllers = kitchensink.Controllers || {};

(function() {
    'use strict';

    kitchensink.Controllers.TabbarsController = kitchensink.Controllers.AbstractController.extend({

        pageHeadline: 'Tabbar Layouts',

        registerToMenu: function( menuController ) {
            menuController.registerMenuItem({
                _value_: 'Tabbar Layouts',
                goto: 'tabbars'
            });
        },

        _initViews: function() {
            if( !this.contentView ) {
                this.contentView = kitchensink.Views.TabbarsView.create(this, null, true);
            }
            if( !this.headerView ) {
                this.headerView = kitchensink.Views.BackheaderView.create(this, null, true);
            }

            this._applyViews();
        },

        gotoTabbarExample: function(event, element){

            if(element.model.get('tabbarExample') === 1){
                kitchensink.router.tabbarController.changeScrollingType(NO);
            } else if(element.model.get('tabbarExample') === 2){
                kitchensink.router.tabbarController.changeScrollingType(YES);
            }

            kitchensink.navigate({
                route: 'tabbar/0'
            });
        }

    });

})();

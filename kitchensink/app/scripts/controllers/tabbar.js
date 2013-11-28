/*global kitchensink, M*/

kitchensink.Controllers = kitchensink.Controllers || {};

(function() {
    'use strict';

    kitchensink.Controllers.TabbarController = kitchensink.Controllers.AbstractController.extend({

        registerToMenu: function( menuController ) {
            menuController.registerMenuItem({
                _value_: 'Tabbar Layout',
                goto: 'tabbar/0'
            });
        },

        initialized: null,

        /**
         * The application start (after reload)
         */
        applicationStart: function( settings ) {
            this.init();
            if(settings.tab){
                this.setLayout(settings.tab);
            }
        },

        init: function() {
            if( this.initialized === null ) {
                this.initialized = YES
            }
        },

        show: function( settings ) {

                this.applicationStart(settings);

        },

        setLayout: function( index ) {
            this.tabLayout = M.TabLayout.extend({
                scrolling: YES,
                switchToTabCallback: function( index ) {
                    kitchensink.navigate({
                        route: 'tabbar/' + index
                    });
                }
            }).create(this, null, true);


            this.tabLayout.applyViews(kitchensink.Views.TabsView);

            if(!index || index === null || index == 'null'){
                index = 0;
            }
            this.tabLayout.switchToTab(index);
            kitchensink.setLayout(this.tabLayout);
            kitchensink.navigate({
                route: 'tabbar/' + index
            });

        }
    });

})();

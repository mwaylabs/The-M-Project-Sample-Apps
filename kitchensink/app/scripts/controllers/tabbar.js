/*global kitchensink, M*/

kitchensink.Controllers = kitchensink.Controllers || {};

(function() {
    'use strict';

    kitchensink.Controllers.TabbarController = kitchensink.Controllers.AbstractController.extend({

        scrolling: NO,

        sourceCodePath: 'scripts/views/tabbars.js',

        changeScrollingType: function( scroll ){
            this.scrolling = scroll;
            this.tabLayout = null;
        },

        /**
         * The application start (after reload)
         */
        applicationStart: function( settings ) {
            debugger;
            if(settings.tab){
                this.setLayout(settings.tab);
            }
        },

        show: function( settings ) {
            debugger;
            if(this.tabLayout){
                this.tabLayout.switchToTab(settings.tab);
            } else {
                this.applicationStart(settings);
            }

        },

        setLayout: function( index ) {
            this.tabLayout = M.TabLayout.extend({
                scrolling: this.scrolling,
                switchToTabCallback: function( index ) {
                    kitchensink.navigate({
                        route: 'tabbar/' + index
                    });
                }
            }).create(this, null, true);


            this.tabLayout.applyViews(kitchensink.Views.TabsView);

            if(!index || index === null || index === 'null'){
                index = 0;
            }

            kitchensink.setLayout(this.tabLayout);
            kitchensink.navigate({
                route: 'tabbar/' + index
            });

            this.tabLayout.switchToTab(index);
        }
    });

})();

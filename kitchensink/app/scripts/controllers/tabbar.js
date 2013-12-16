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
        applicationStart: function( tab ) {
            if(tab){
                this.setLayout(tab);
            }
        },

        show: function( tab ) {
            if(this.tabLayout){
                this.tabLayout.switchToTab(tab);
            } else {
                this.applicationStart(tab);
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

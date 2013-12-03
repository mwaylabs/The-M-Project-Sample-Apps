/*global demoapp*/

demoapp.Controllers = demoapp.Controllers || {};

(function() {
    'use strict';

    demoapp.Controllers.DetailController = demoapp.Controllers.MenuController.extend({

        initViews: function(){
            // Initialzie the DetailView with the controller (this) as scope
            this.contentView = demoapp.Views.DetailView.create(this);
        },

        // Navigation: on button tap
        gotoMenuView: function(){
            // navigate to the menu view via a route
            demoapp.navigate({
                route: ''
            });
        }
    });

})();

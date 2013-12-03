/*global demoapp*/

demoapp.Controllers = demoapp.Controllers || {};

(function() {
    'use strict';

    demoapp.Controllers.MenuController = M.Controller.extend({

        // The Content of the page
        contentView: null,

        // Called when the Application starts
        applicationStart: function () {
            // Create a layout and apply it to the application
            var layout = M.SwitchLayout.extend().create(this);
            // Set the Layout to the View
            demoapp.setLayout(layout);
            // Initialize the Views
            this.initViews();
            // Apply the Views to the Layout (render)
            this._applyViews();
        },

        show: function () {
            // Initialize the Views
            this.initViews();
            // Apply the Views to the Layout (render)
            this._applyViews();
            // Switch the Layout
            demoapp.getLayout().startTransition();
        },

        initViews: function(){
            // Create the MenuView with the controller (this) as scope
            this.contentView = demoapp.Views.MenuView.create(this);
        },

        _applyViews: function() {
            demoapp.getLayout().applyViews({
                content: this.contentView
            });
        },

        // Navigation: on button tap
        gotoDetailView: function(){
            // navigate to the detail view via a route
            demoapp.navigate({
                route: '/detail',
                transition: M.PageTransitions.CONST.FALL
            });
        }
    });

})();

/*global kitchensink*/

kitchensink.Controllers = kitchensink.Controllers || {};

(function() {
    'use strict';

    /**
     * The AbstractController provides the primary mechanism for all
     * kitchensink controllers. Each kitchensink controller inherits
     * from this controller.
     */
    kitchensink.Controllers.AbstractController = M.Controller.extend({

        // Contains the current headerView
        headerView: null,

        // Contains the current contentView
        contentView: null,

        // The headline which will be displayed in the headerView
        pageHeadline: '',

        // the application sourcecode root path on github
        githubApplicationRootUrl: 'https://github.com/mwaylabs/The-M-Project-Sample-Apps/blob/master/kitchensink/app/',

        // The path to the specific source on github
        sourceCodePath: '',

        // Called from the router when the application starts
        applicationStart: function(settings) {

            // Create a layout and apply it to the application
            var _layout = M.SwitchHeaderContentLayout.extend().create(this, null, true);
            kitchensink.setLayout(_layout);
            this._initViews(settings);
        },

        // Called from the router everytime the route/url matchs the controller (binding in main.js)
        show: function(settings) {
            this._initViews(settings);
            var _layout = M.SwitchHeaderContentLayout.extend().create(this, null, true);
            if(_layout._type === kitchensink.getLayout()._type){
                kitchensink.getLayout().startTransition();
            } else {
                this.applicationStart();
            }
        },

        // Called for every controller when the application is ready. applicationStart is always called before.
        applicationReady: function(){
            this.registerToMenu(kitchensink.router.menuController);
        },

        // This method assign the header and content view to the current layout.
        _applyViews: function() {
            kitchensink.getLayout().applyViews({
                header: this.headerView,
                content: this.contentView
            });
        },

        _initViews: function() {
            // OVERRIDE ME PLEASE
        },

        registerToMenu: function(){
            // OVERRIDE ME PLEASE
        },


        getSourceCodeUrl: function(){
            return this.githubApplicationRootUrl + this.sourceCodePath;
        }
    });

})();

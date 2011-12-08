// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsListViewController
// ==========================================================================

KitchenSink.ControlsLoaderViewController = M.Controller.extend({

    controlsList: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Default loader",
                    page: "controlsLoaderView1"

                },

                {

                    name: "Custom loader message",
                    page: "controlsLoaderView2"

                }

            ];

            this.set('controlsList', controlsList);

        }

    },

    controlSelected: function(id) {

        var controlName = M.ViewManager.getView(id, 'name').value;
        var control = _.detect(this.controlsList, function(control) {
            return control.name === controlName;
        });

        this.switchToPage(control.page);

    },

    back: function() {

        this.switchToPage('controls', M.TRANSITION.SLIDE, YES);

    },

    here: function() {

        this.switchToPage('controlsLoaderView', M.TRANSITION.SLIDE, YES);

    },

    showLoader: function() {

        M.LoaderView.show();

    },


    showLoader2: function() {

        M.LoaderView.show('Custom message');

    },

    hideLoader: function() {

        M.LoaderView.hide();

    }

});
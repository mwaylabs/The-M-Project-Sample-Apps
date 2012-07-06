// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsButtonViewController
// ==========================================================================

KitchenSink.ControlsToggleSwitchController = M.Controller.extend({

    controlsList: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Default ToggleSwitchView",
                    page: "controlsToggleSwitch1"

                },
                {

                    name: "Mini ToggleSwitchView",
                    page: "controlsToggleSwitch2"

                },
                {

                    name: "Complex ToggleSwitchView",
                    page: "controlsToggleSwitch3"

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

        this.switchToPage('controlsToggleSwitchView', M.TRANSITION.SLIDE, YES);

    }

});
// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsListViewController
// ==========================================================================

KitchenSink.ControlsSliderViewController = M.Controller.extend({

    controlsList: null,

    output1: null,

    output2: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Default slider",
                    page: "controlsSliderView1"

                },

                {

                    name: "Slider with custom values",
                    page: "controlsSliderView2"

                },

                {

                    name: "Slider with custom steps",
                    page: "controlsSliderView3"

                },

                {

                    name: "Slider with color indicator",
                    page: "controlsSliderView4"

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

        this.switchToPage('controlsSliderView', M.TRANSITION.SLIDE, YES);

    }

});
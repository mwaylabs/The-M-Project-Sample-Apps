// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: BindingSample
// Controller: CountController
// ==========================================================================

BindingSample.CountController = M.Controller.extend({

    numberOfClicks: 0,

    addClick: function() {
        this.set('numberOfClicks', this.numberOfClicks + 1);
    }

});
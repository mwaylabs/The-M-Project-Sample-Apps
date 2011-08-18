// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: StoreSample
// Controller: NavigationController
// ==========================================================================

StoreSample.NavigationController = M.Controller.extend({

    gotoInfoPage: function() {
        this.switchToPage('infoPage', M.TRANSITION.FLIP);
    },

    goBack: function() {
        history.back(-1);
    }

});

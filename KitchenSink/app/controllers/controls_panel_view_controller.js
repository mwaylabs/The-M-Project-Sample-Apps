// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsPanelViewController
// ==========================================================================

KitchenSink.ControlsPanelViewController = M.Controller.extend({

    controlsList: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Default panel",
                    page: "controlsPanelView1"

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

    openLeftRevealPanel: function() {
        this.openPanel('leftRevealPanel');
    },

    openLeftPushPanel: function() {
        this.openPanel('leftPushPanel');
    },

    openRightOverlayPanel: function() {
        this.openPanel('rightOverlayPanel');
    },

    openPanel: function(panelName) {
        var panel = M.ViewManager.getView(M.ViewManager.getCurrentPage(), panelName);
        if (panel) {
            panel.open();
        }
    },

    closePanel: function(id) {
        var btn = M.ViewManager.getViewById(id);
        if (btn && btn.parentView) {
            btn.parentView.close();
        }
    },

    back: function() {

        this.switchToPage('controls', M.TRANSITION.SLIDE, YES);

    },

    here: function() {

        this.switchToPage('controlsPanelView', M.TRANSITION.SLIDE, YES);

    }

});
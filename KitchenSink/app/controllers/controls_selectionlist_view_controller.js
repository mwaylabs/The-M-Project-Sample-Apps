// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsListViewController
// ==========================================================================

KitchenSink.ControlsSelectionListViewController = M.Controller.extend({

    controlsList: null,

    selection: null,

    valueBindingContent: null,

    valueBindingValue: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Selection list (single selection)",
                    page: "controlsSelectionListView1"

                },

                {

                    name: "Selection list (multiple selection)",
                    page: "controlsSelectionListView2"

                },

                {

                    name: "Selection list (single selection dialog)",
                    page: "controlsSelectionListView3"

                },

                {

                    name: "getSelection()",
                    page: "controlsSelectionListView4"

                },

                {

                    name: "setSelection()",
                    page: "controlsSelectionListView5"

                },

                {

                    name: "Selection list (multiple selection dialog)",
                    page: "controlsSelectionListView6"

                },
                {

                    name: "valueBinding Example",
                    page: "controlsSelectionListView7"

                }

            ];

            var vbc = [{"value":"06:00:00","label":"06:00"},{"value":"06:30:00","label":"06:30"},{"value":"07:00:00","label":"07:00"},{"value":"07:30:00","label":"07:30"},{"value":"08:00:00","label":"08:00"},{"value":"08:30:00","label":"08:30"},{"value":"09:00:00","label":"09:00"},{"value":"09:30:00","label":"09:30"},{"value":"10:00:00","label":"10:00"},{"value":"10:30:00","label":"10:30"},{"value":"11:00:00","label":"11:00"},{"value":"11:30:00","label":"11:30"},{"value":"12:00:00","label":"12:00"},{"value":"12:30:00","label":"12:30"},{"value":"13:00:00","label":"13:00"},{"value":"13:30:00","label":"13:30"},{"value":"14:00:00","label":"14:00"},{"value":"14:30:00","label":"14:30"},{"value":"15:00:00","label":"15:00"},{"value":"15:30:00","label":"15:30"},{"value":"16:00:00","label":"16:00"},{"value":"16:30:00","label":"16:30"},{"value":"17:00:00","label":"17:00"},{"value":"17:30:00","label":"17:30"},{"value":"18:00:00","label":"18:00"},{"value":"18:30:00","label":"18:30"},{"value":"19:00:00","label":"19:00"},{"value":"19:30:00","label":"19:30"},{"value":"20:00:00","label":"20:00"},{"value":"20:30:00","label":"20:30"},{"value":"21:00:00","label":"21:00"},{"value":"21:30:00","label":"21:30"},{"value":"22:00:00","label":"22:00"},{"value":"22:30:00","label":"22:30"}];

            this.set('valueBindingContent', vbc);

            this.set('controlsList', controlsList);

        }

    },

    setValueBindingValue: function(){
        this.set("valueBindingValue", "07:00:00");
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

        this.switchToPage('controlsSelectionListView', M.TRANSITION.SLIDE, YES);

    },

    getSelection: function() {

        var selection = M.ViewManager.getView('controlsSelectionListView4', 'selectionList').getSelection();

        this.set('selection', selection.length > 0 ? selection : '-');

    },

    setSelection: function() {

        M.ViewManager.getView('controlsSelectionListView5', 'selectionList').setSelection('item2');

    }

});
// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.5
//
// Project: KitchenSink
// Controller: ControlsDialogViewController
// ==========================================================================

KitchenSink.ControlsDialogViewController = M.Controller.extend({

    controlsList: null,

    callback: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var controlsList = [

                {

                    name: "Alert dialog",
                    page: "controlsDialogView1"

                },

                {

                    name: "Confirm dialog",
                    page: "controlsDialogView2"

                },

                {

                    name: "Actionsheet dialog (default)",
                    page: "controlsDialogView3"

                },

                {

                    name: "Actionsheet dialog",
                    page: "controlsDialogView4"

                },

                {

                    name: "Working with callbacks",
                    page: "controlsDialogView5"

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

        this.switchToPage('controlsDialogView', M.TRANSITION.SLIDE, YES);

    },

    openAlert: function() {

        M.DialogView.alert({

            title: 'Alert dialog',

            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

        })

    },

    openConfirm: function() {

        M.DialogView.confirm({

            title: 'Confirm dialog',

            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

        })

    },

    openActionsheet: function() {

        M.DialogView.actionSheet({

            title: 'Actionsheet dialog',

            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

            cancelButtonValue: 'Cancel',

            destructiveButtonValue: 'Destruct'

        })

    },

    openActionsheet2: function() {

        M.DialogView.actionSheet({

            title: 'Actionsheet dialog',

            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

            cancelButtonValue: 'Cancel',

            otherButtonValues: ['Button 1', 'Button 2', 'Button 3'],

            destructiveButtonValue: 'Destruct'

        })

    },

    openActionsheet3: function() {

        M.DialogView.actionSheet({

            title: 'Actionsheet dialog',

            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

            cancelButtonValue: 'Cancel',

            otherButtonValues: ['Button 1', 'Button 2', 'Button 3'],

            otherButtonTags: ['Button 1', 'Button 2', 'Button 3'],

            callbacks: {
                cancel: {
                    target: this,
                    action: 'callbackCancel'
                },
                other: {
                    target: this,
                    action: 'callbackOtherButtons'
                }
            }

        })

    },

    callbackCancel: function() {

        this.set('callback', 'Cancel button');

    },

    callbackOtherButtons: function(tag) {

        this.set('callback', tag);

    },

    callbackButton2: function() {

        this.set('callback', tag);

    },

    callbackButton3: function() {

        this.set('callback', tag);

    }

});
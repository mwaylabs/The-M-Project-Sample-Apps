// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: DialogSample
// Controller: DialogController
// ==========================================================================

DialogSample.DialogController = M.Controller.extend({

    notification: '',

    openAlert: function() {

        M.DialogView.alert({
            message: 'I am the super cool alert dialog of The-M-Project.',
            title: 'Alert Dialog',
            confirmButtonValue: 'Ok.',
            callbacks: {
                confirm: {
                    target: this,
                    action: 'alertOnOk'
                }
            }
        });

    },

    alertOnOk: function() {
        this.set('notification', 'You just clicked on the \'OK\' button of the alert dialog!');
    },

    openConfirm: function() {
        M.DialogView.confirm({
            message: 'Hi, I am a pretty sweet confirm dialog of The M-Project. You can use me to provide the user with a possibility to accept or decline something. ',
            title: 'Confirm Dialog',
            confirmButtonValue: 'Ok',
            cancelButtonValue: 'Cancel',
            callbacks: {
                confirm: {
                    target: this,
                    action: 'confirmOnOk'
                },
                cancel: {
                    target: this,
                    action: 'confirmOnCancel'
                }
            }
        });
    },

    confirmOnOk: function() {
        this.set('notification', 'You just clicked on the \'OK\' button of the confirm dialog!');
    },

    confirmOnCancel: function() {
        this.set('notification', 'You just clicked on the \'Cancel\' button of the confirm dialog!');
    },

    openActionSheet: function() {
        M.DialogView.actionSheet({
            title: 'Action Sheet Dialog',
            cancelButtonValue: 'Cancel',
            otherButtonValues: ['Facebook', 'Twitter', 'Flickr'],
            otherButtonTags: ['facebook', 'twitter', 'flickr'],
            callbacks: {
                cancel: {
                    target: this,
                    action: 'actionSheetOnCancel'
                },
                other: {
                    target: this,
                    action: 'other'
                }
            }
        });

    },

    other: function(buttonTag) {
        switch(buttonTag) {
            case 'facebook':
                this.set('notification', 'You just clicked on the \'Facebook\' button of the action sheet dialog!');
                break;
            case 'twitter':
                this.set('notification', 'You just clicked on the \'Twitter\' button of the action sheet dialog!');
                break;
            case 'flickr':
                this.set('notification', 'You just clicked on the \'Flickr\' button of the action sheet dialog!');
                break;
            default:
                this.set('notification', "It couldn't be determined which button was pressed.");
                break;
        }
    },
    
    actionSheetOnCancel: function() {
        this.set('notification', 'You just clicked on the \'Cancel\' button of the action sheet dialog!');
    }

});
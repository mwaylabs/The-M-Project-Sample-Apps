// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: SelectionListSample
// Controller: MultipleSelectionDialogController
// ==========================================================================

SelectionListSample.MultipleSelectionDialogController = M.Controller.extend({

    items: null,

    init: function(isFirstLoad) {
        if(isFirstLoad) {
            this.set('items', [
                {
                    value: 'germany',
                    label: 'Germany (germany)'
                },
                {
                    value: 'italy',
                    label: 'Italy (italy)'
                },
                {
                    value: 'us',
                    label: 'United States (us)'
                },
                {
                    value: 'spain',
                    label: 'Spain (spain)'
                }
            ]);
        }
    },

    setSelection: function() {

        var selectionList = M.ViewManager.getView('multipleSelectionDialog', 'selectionList');
        var textField = M.ViewManager.getView('multipleSelectionDialog', 'textField');

        if(!textField.value || textField.value === '') {

            M.DialogView.alert({

                title: 'Error',

                message: 'You have to enter a value in the text field in order to set the selection list\'s selection.'

            });

        } else {

            var textFieldValue = $.trim(textField.value.replace(/\s/gi, ''));

            selectionList.setSelection(textFieldValue.split(','));
            
            textField.setValue('');

            textField.lostFocus();

        }

    },

    getSelection: function() {

        var selectionList = M.ViewManager.getView('multipleSelectionDialog', 'selectionList');
        var selection = selectionList.getSelection(YES);

        var message = '';
        if(selection.length > 0) {
            for(var i in selection) {
                message += selection[i].label + '<br/>';
            }
        } else {
            message = 'Nothing selected...';
        }

        M.DialogView.alert({

            title: 'Selected Item(s)',

            message: message

        });

    }

})
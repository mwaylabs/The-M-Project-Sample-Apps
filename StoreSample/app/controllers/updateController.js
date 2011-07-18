// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: StoreSample
// Controller: UpdateController
// ==========================================================================

StoreSample.UpdateController = M.Controller.extend({

    updatePerson: function() {
        var recordId = M.ViewManager.getView('updatePage', 'selectPersonList').getSelection();
        if(!recordId) {
            M.DialogView.alert({
                title: 'Please select a person!',
                message: 'You need to select a person from the selection list in order to update it. If there is no person available, create a new one or load existing persons from the local storage.'
            })
            return;
        }

        var record = StoreSample.PersonStore.getRecordById(recordId);
        var currentRecordState = this.filterState(record.state);
        record.set('lastName', this.createRandomString(6, 15));

        if(record) {
            M.DialogView.alert({
                title: '1 record updated!',
                message: 'This person was successfully updated:<br/><br/>firstName: ' + record.get('firstName') + '<br/>lastName: ' + record.get('lastName')
            });
            StoreSample.ListController.remove(record, currentRecordState);
            StoreSample.ListController.add(record, 'dirty');
        } else {
            M.DialogView.alert({
                title: 'Record could not be updated!',
                message: 'Please try again.'
            });
        }
    },

    saveUpdatedPersons: function() {
        var records = StoreSample.PersonStore.getRecordsByState([M.STATE_DIRTY]);
        StoreSample.PersonStore.saveBulk({
            records: records,
            callbacks: {
                successOp: {
                    action: function(record, opCount, opTotal) {
                        M.LoaderView.show('Updated ' + (opCount+1) + '/' + (opTotal+1));
                        StoreSample.ListController.remove(record, 'dirty');
                        StoreSample.ListController.add(record, 'insync');
                    }
                },
                success: {
                    action: function(records) {
                        M.LoaderView.hide(YES);
                        if(records.length === 0) {
                            M.DialogView.alert({
                                title: '0 records updated!',
                                message: 'There was no new person found that could be updated.'
                            })
                        } else {
                            M.DialogView.alert({
                                title: records.length + ' record(s) updated.',
                                message: 'Record(s) successfully updated!'
                            })
                        }
                    }
                }
            }
        });
    },

    createRandomString: function(minLength, maxLength) {
        minLength = minLength > 0 ? minLength : 1;
        maxLength = maxLength <= 256 ? maxLength : 256;

        var length = M.Math.random(minLength, maxLength);
        var chars = 'abcdefghiklmnopqrstuvwxyz';

        var randomstring = '';
        for(var i = 0; i < length; i++) {
            var rand = M.Math.random(0, chars.length);
            randomstring += chars.substring(rand, rand + 1);
        }

        randomstring = randomstring.substring(0, 1).toUpperCase() + randomstring.substring(1);

        return randomstring;
    },

    filterState: function(state) {
        switch (state) {
            case M.STATE_NEW:
                return 'new';
                break;
            case M.STATE_DIRTY:
                return 'dirty';
                break;
            case M.STATE_DELETED:
                return 'deleted';
                break;
            case M.STATE_INSYNC:
                return 'insync';
                break;
        }
    }

});

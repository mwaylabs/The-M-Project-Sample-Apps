// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: StoreSample
// Controller: CreateController
// ==========================================================================

StoreSample.CreateController = M.Controller.extend({

    createPerson: function() {
        var record = StoreSample.PersonStore.createRecord({
            firstName: this.createRandomString(4, 10),
            lastName: this.createRandomString(6, 15)
        });

        if(record) {
            M.DialogView.alert({
                title: '1 record created!',
                message: 'A new person was successfully created:<br/><br/>firstName: ' + record.get('firstName') + '<br/>lastName: ' + record.get('lastName')
            });
            StoreSample.ListController.add(record, 'new');
        } else {
            M.DialogView.alert({
                title: 'Record could not be created!',
                message: 'Please try again.'
            });
        }
    },

    savePersons: function() {
        var records = StoreSample.PersonStore.getRecordsByState([M.STATE_NEW]);
        StoreSample.PersonStore.saveBulk({
            records: records,
            callbacks: {
                successOp: {
                    action: function(record, opCount, opTotal) {
                        M.LoaderView.show('Saved ' + (opCount+1) + '/' + (opTotal+1));
                        StoreSample.ListController.remove(record, 'new');
                        StoreSample.ListController.add(record, 'insync');
                    }
                },
                success: {
                    action: function(records) {
                        M.LoaderView.hide(YES);
                        if(records.length === 0) {
                            M.DialogView.alert({
                                title: '0 records saved!',
                                message: 'There was no new person found that could be saved.'
                            })
                        } else {
                            M.DialogView.alert({
                                title: records.length + ' record(s) saved.',
                                message: 'Record(s) successfully saved!'
                            })
                        }
                    }
                },
                error: {
                    action: function(error) {
                        alert(error);
                    }
                },
                errorOp: {
                    action: function(error) {
                        alert(error);
                    }
                },
                errorTx: {
                    action: function(error) {
                        alert(error);
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
    }

});

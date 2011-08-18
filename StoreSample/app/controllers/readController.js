// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: StoreSample
// Controller: ReadController
// ==========================================================================

StoreSample.ReadController = M.Controller.extend({

    getPersons: function() {
        StoreSample.PersonStore.findAll({
            callbacks: {
                successOp: {
                    action: function(record, opCount, opTotal) {
                        M.LoaderView.show('Retrieved ' + (opCount+1) + '/' + (opTotal+1));
                        StoreSample.ListController.add(record, 'insync');
                    }
                },
                success: {
                    action: function(records) {
                        M.LoaderView.hide(YES);
                        if(records.length === 0) {
                            M.DialogView.alert({
                                title: '0 records loaded!',
                                message: 'There was no person found in the local storage of you browser.'
                            })
                        } else {
                            M.DialogView.alert({
                                title: records.length + ' record(s) loaded.',
                                message: 'Record(s) successfully loaded!'
                            })
                        }
                    }
                },
                error: {
                    action: function(error) {
                        alert(error);
                    }
                }
            }
        });
    }

});

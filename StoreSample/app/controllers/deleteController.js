// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: StoreSample
// Controller: DeleteController
// ==========================================================================

StoreSample.DeleteController = M.Controller.extend({

    deletePerson: function() {
        var recordId = M.ViewManager.getView('deletePage', 'selectPersonList').getSelection();
        if(!recordId || !StoreSample.PersonStore.getRecordById(recordId)) {
            M.DialogView.alert({
                title: 'Please select a person!',
                message: 'You need to select a person from the selection list in order to delete it. If there is no person available, create a new one or load existing persons from the local storage.'
            })
            return;
        }

        StoreSample.PersonStore.del({
            record: StoreSample.PersonStore.getRecordById(recordId),
            callbacks: {
                success: {
                    target: this,
                    action: function(record) {
                        M.DialogView.alert({
                            title: '1 record delete!',
                            message: 'This person was successfully deleted.'
                        })
                        StoreSample.ListController.remove(record[0], this.filterState(record[0].state));
                        StoreSample.ListController.add(record[0], 'deleted_permanently');
                    }
                }
            }
        });
    },

    deleteAllPersons: function() {
        M.DialogView.confirm({
            title: 'Delete all persons',
            message: 'Do you really want to delete all persons at once?',
            callbacks: {
                confirm: {
                    target: this,
                    action: 'doDeleteAllPersons'
                }
            }
        })
    },

    doDeleteAllPersons: function() {
        StoreSample.PersonStore.delAll({
            callbacks: {
                successOp: {
                    target: this,
                    action: function(record, opCount, opTotal) {
                        M.LoaderView.show('Deleted ' + (opCount+1) + '/' + (opTotal+1));
                        StoreSample.ListController.add(record, 'deleted_permanently');
                        StoreSample.ListController.remove(record, this.filterState(record.state));
                    }
                },
                success: {
                    action: function(records) {
                        M.LoaderView.hide(YES);
                        if(records.length === 0) {
                            M.DialogView.alert({
                                title: '0 records deleted!',
                                message: 'There was no new person found that could be deleted.'
                            })
                        } else {
                            M.DialogView.alert({
                                title: records.length + ' record(s) deleted.',
                                message: 'Record(s) successfully deleted!'
                            })
                        }
                    }
                }
            }
        });
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

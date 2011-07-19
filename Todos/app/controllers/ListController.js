// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: Todos
// Controller: ListController
// ==========================================================================

Todos.ListController = M.Controller.extend({

    notes: null,

    init: function(isFirstLoad) {
        if(isFirstLoad) {
            Todos.NoteStore.findAll({
            callbacks: {
                successOp: {
                    action: function(record, opCount, opTotal) {
                        M.LoaderView.show('Retrieved ' + (opCount+1) + '/' + (opTotal+1));
                    }
                },
                success: {
                    target: this,
                    action: function(records) {
                        M.LoaderView.hide(YES);
                        this.set('notes', Todos.NoteStore.records);
                        this.applyDone();
                    }
                }
            }
            });
        } else {
            this.set('notes', Todos.NoteStore.records);
            this.applyDone();
        }
    },

    markAsDone: function(id) {
        var listItemId = $('#' + id).parent().parent().parent().parent().attr('id');
        var listItem = M.ViewManager.getViewById(listItemId);
        if(listItem) {
            var record = Todos.NoteStore.getRecordById(listItem.modelId);
            var done = record.get('done') ? NO : YES;
            record.set('done', done);
            Todos.NoteStore.save({
                record: record,
                callbacks: {
                    success: {
                        target: this,
                        action: function() {
                            this.set('notes', Todos.NoteStore.records);
                            this.applyDone();
                        }
                    }
                }
            });
        }
    },

    applyDone: function() {
        var list = M.ViewManager.getView('listPage', 'todoList');
        if(list) {
            $('#' + list.id).find('li').each(function() {
                var listItem = M.ViewManager.getViewById($(this).attr('id'));
                if(listItem) {
                    var record = Todos.NoteStore.getRecordById(listItem.modelId);
                    if(record && record.get('done')) {
                        listItem.addCssClass('itemDone');
                    } else {
                        listItem.removeCssClass('itemDone');
                    }
                }
            });
        }
    }

});

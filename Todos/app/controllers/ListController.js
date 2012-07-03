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
        this.set('notes', Todos.NoteModel.find());
        this.applyDone();
    },

    markAsDone: function(id) {
        var listItemId = $('#' + id).parent().parent().parent().parent().parent().attr('id');
        var listItem = M.ViewManager.getViewById(listItemId);
        if(listItem) {
            var record = Todos.NoteModel.recordManager.getRecordForId(listItem.modelId);
            var done = record.get('done') ? NO : YES;
            record.set('done', done);
            record.save();
            this.set('notes', Todos.NoteModel.find());
            this.applyDone();
        }
    },

    applyDone: function() {
        var list = M.ViewManager.getView('listPage', 'todoList');
        if(list) {
            $('#' + list.id).find('li').each(function() {
                var listItem = M.ViewManager.getViewById($(this).attr('id'));
                if(listItem) {
                    var record = Todos.NoteModel.recordManager.getRecordForId(listItem.modelId);
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

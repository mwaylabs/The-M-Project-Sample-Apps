// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: Todos
// Controller: NewItemController
// ==========================================================================

Todos.NewItemController = M.Controller.extend({

    currentDate: null,

    init: function() {
        this.set('currentDate', D8.now().format(M.I18N.l('due_date_format')));
    },

    addTodo: function() {
        if(!M.ViewManager.getView('newItemPage', 'form1').validate()) {
            if(M.Validator.validationErrors) {
                return;
            }
        }

        var title = M.ViewManager.getView('newItemPage', 'title').value;
        var text = M.ViewManager.getView('newItemPage', 'text').value;
        var date = D8.create(M.ViewManager.getView('newItemPage', 'date').value).getTimestamp();

        var record = Todos.NoteModel.createRecord({
            title: title,
            text: text,
            date: date,
            done: NO
        });

        record.save();
        M.ViewManager.getView('newItemPage', 'title').setValue('');
        M.ViewManager.getView('newItemPage', 'text').setValue('');
        M.ViewManager.getView('newItemPage', 'date').setValue('');
        this.switchToTab(Todos.Tabs.listTab);
    }

});

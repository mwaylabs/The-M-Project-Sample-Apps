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
        this.set('currentDate', M.Date.now().format(M.I18N.l('due_date_format')));
    },

    addTodo: function() {
        if(!M.ViewManager.getView('newItemPage', 'form1').validate()) {
            if(M.Validator.validationErrors) {
                return;
            }
        }

        var title = M.ViewManager.getView('newItemPage', 'title').value;
        var text = M.ViewManager.getView('newItemPage', 'text').value;
        var date = M.Date.create(M.ViewManager.getView('newItemPage', 'date').value);

        var record = Todos.NoteStore.createRecord({
            title: title,
            text: text,
            date: date,
            done: NO
        });

        Todos.NoteStore.save({
            record: record,
            callbacks: {
                success: {
                    target: this,
                    action: function() {
                        M.ViewManager.getView('newItemPage', 'title').setValue('');
                        M.ViewManager.getView('newItemPage', 'text').setValue('');
                        M.ViewManager.getView('newItemPage', 'date').setValue('');
                        this.switchToTab(Todos.Tabs.listTab);
                    }
                }
            }
        });
    }

});

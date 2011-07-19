// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: Todos
// Controller: DetailsController
// ==========================================================================

Todos.DetailsController = M.Controller.extend({

    record: null,

    goBack: function() {
        this.switchToPage('listPage', null, YES);
    },

    showDetails: function(id, m_id) {
        var record = Todos.NoteStore.getRecordById(m_id);
        if (record) {
            this.set('record', record);
            this.switchToPage('detailsPage');
        }
    },

    resetToggleView: function() {
        var toolbarToggleView = M.ViewManager.getView('detailsPage', 'toggleButton');
        var toolbarToggleViewInit = M.ViewManager.getView('detailsPage', 'button1').id;
        if (toolbarToggleView.currentView.id !== toolbarToggleViewInit) {
            toolbarToggleView.toggleView();
        }

        var contentToggleView = M.ViewManager.getView('detailsPage', 'content');
        var contentToggleViewInit = M.ViewManager.getView('detailsPage', 'content1').id;
        if (contentToggleView.currentView.id !== contentToggleViewInit) {
            contentToggleView.toggleView();
        }
    },

    showEditItem: function() {
        var contentToggleView = M.ViewManager.getView('detailsPage', 'content');
        contentToggleView.toggleView();
    },

    saveItem: function() {
        if (!M.ViewManager.getView('detailsPage', 'form1').validate()) {
            if (M.Validator.validationErrors) {
                return;
            }
        }

        var title = M.ViewManager.getView('detailsPage', 'title').value;
        var text = M.ViewManager.getView('detailsPage', 'text').value;
        var date = M.Date.create(M.ViewManager.getView('detailsPage', 'date').value);

        this.record.set('title', title);
        this.record.set('text', text);
        this.record.set('date', date);

        Todos.NoteStore.save({
            record: this.record,
            callbacks: {
                success: {
                    target: this,
                    action: function() {
                        this.resetToggleView();
                        this.set('record', this.record);
                    }
                }
            }
        });
    },

    deleteItem: function() {
        M.DialogView.confirm({
            title: M.I18N.l('delete_'),
            message: M.I18N.l('confirm'),
            callbacks: {
                confirm: {
                    target: this,
                    action: function () {
                        Todos.NoteStore.del({
                            record: this.record,
                            callbacks: {
                                success: {
                                    target: this,
                                    action: function() {
                                        this.switchToPage('listPage', null, YES);
                                    }
                                }
                            }
                        })
                    }
                }
            }
        })
    }

});

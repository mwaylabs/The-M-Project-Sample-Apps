// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: �2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      04.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

Todos2.TodoController = M.Controller.extend({

    todos: null,

    selId: null,

    selTitle: null,

    selText: null,

    selDate: null,

    selDateFormat: null,

    counter: 0,

    noteToDelete: null,

    init: function(isFirst) {
        if(isFirst) {
            this.set('todos', Todos2.Note.find());
        }

        if(M.ViewManager.getView('page1', 'todoList').inEditMode) {
            M.ViewManager.getView('page1', 'todoList').toggleRemove({
                target: this,
                action: 'removeTodo'
            });
            M.ViewManager.getView('page1', 'toggleView').toggleView();
        }
    },

    goBack: function() {
        history.back(-1);
    },

    hide: function() {
        if(!M.ViewManager.getView('subpage1', 'toggleView').isInFirstState) {
            M.ViewManager.getView('subpage1', 'content').toggleView();
            M.ViewManager.getView('subpage1', 'toggleView').toggleView();
        }
    },

    addTodo: function() {
        if(!M.ViewManager.getView('page2', 'form1').validate()) {
            if(M.Validator.validationErrors) {
                return;
            }
        }

        var title = M.ViewManager.getView('page2', 'title').value;
        var text = M.ViewManager.getView('page2', 'text').value;
        var date = M.Date.create(M.ViewManager.getView('page2', 'date').value);

        Todos2.Note.createRecord( { title: title, text: text, date: date } ).save();
        this.set('todos', Todos2.Note.records());

        M.ViewManager.getView('page2', 'title').setValue('');
        M.ViewManager.getView('page2', 'text').setValue('');
        M.ViewManager.getView('page2', 'date').setValue('');

        this.switchToTab(Todos2.tabs.tabItem1);
    },

    removeTodo: function(domId, modelId) {
        this.noteToDelete = modelId;

        M.DialogView.confirm({
            title: 'Delete?',
            message: 'Do you really want to delete this item?',
            callbacks: {
                confirm: {
                    target: this,
                    action: 'doDelete'
                },
                cancel: {
                    target: this,
                    action: 'cancelDelete'
                }
            }
        });
    },

    doDelete: function() {
        if(this.noteToDelete) {
            var record = Todos2.Note.recordManager.getRecordForId(this.noteToDelete);
            record.del();
            this.set('todos', Todos2.Note.records());
            this.noteToDelete = null;
        }
    },

    doDeleteFromSubView: function() {
        if(this.noteToDelete) {
            var record = Todos2.Note.recordManager.getRecordForId(this.noteToDelete);
            record.del();
            this.set('todos', Todos2.Note.records());
            this.noteToDelete = null;
            
            this.switchToPage(M.ViewManager.getPage('page1'), null, YES, YES);
            this.switchToPage(M.ViewManager.getPage('page1'), null, YES, YES);
        }
    },

    cancelDelete: function() {
        if(this.noteToDelete) {
            this.noteToDelete = null;
        }
    },

    remove: function() {
        this.noteToDelete = this.selId;

        M.DialogView.confirm({
            title: M.I18N.l('delete_'),
            message: M.I18N.l('confirm'),
            callbacks: {
                confirm: {
                    target: this,
                    action: 'doDeleteFromSubView'
                },
                cancel: {
                    target: this,
                    action: 'cancelDelete'
                }
            }
        });
    },

    showDetails: function(viewId, modelId) {
        var record = Todos2.Note.recordManager.getRecordForId(modelId);
        this.selId = modelId;

        this.set('selTitle', record.get('title'));
        this.set('selText', record.get('text'));

        var date = record.get('date');
        var dateFormat = date.format(M.I18N.l('due_date_format'));
        var days = M.Math.round(M.Date.now().timeBetween(date, M.DAYS));
        this.set('selDateFormat', dateFormat + ' (' + days + ' ' + M.I18N.l('days') + ')');
        this.set('selDate', dateFormat);
        this.switchToPage(M.ViewManager.getPage('subpage1'));
    },

    edit: function() {
        M.ViewManager.getView('page1', 'todoList').toggleRemove({
            target: this,
            action: 'removeTodo'
        });
    },

    editItem: function() {
        M.ViewManager.getView('subpage1', 'toggleView').toggleView();
        M.ViewManager.getView('subpage1', 'content').toggleView();
    },

    saveTodo: function() {
        if(!M.ViewManager.getView('subpage1', 'form2').validate()) {
            if(M.Validator.validationErrors) {
                this.set('selDate', this.selDate);
                this.set('selDateFormat', this.selDateFormat);
                this.set('selText', this.selText);
                this.set('selTitle', this.selTitle);
                return;
            }
        }

        var title = M.ViewManager.getView('subpage1', 'title').value;
        var text = M.ViewManager.getView('subpage1', 'text').value;
        var date = M.Date.create(M.ViewManager.getView('subpage1', 'date').value);
        
        var note = Todos2.Note.recordManager.getRecordForId(this.selId);
        note.set('title', title);
        note.set('text', text);
        note.set('date', date);
        note.save();
        this.set('todos', Todos2.Note.records());

        this.set('selTitle', note.get('title'));
        this.set('selText', note.get('text'));

        var date = note.get('date');
        var dateFormat = date.format(M.I18N.l('due_date_format'));
        var days = M.Math.round(M.Date.now().timeBetween(date, M.DAYS));
        this.set('selDateFormat', dateFormat + ' (' + days + ' ' + M.I18N.l('days') + ')');
        this.set('selDate', dateFormat);

        M.ViewManager.getView('page2', 'title').setValue('');
        M.ViewManager.getView('page2', 'text').setValue('');
        M.ViewManager.getView('page2', 'date').setValue('');

        M.ViewManager.getView('subpage1', 'toggleView').toggleView();
        M.ViewManager.getView('subpage1', 'content').toggleView();
    },

    getDate: function(id) {
        M.DatePickerView.show({
            source: M.ViewManager.getViewById(id),
            useSourceDateAsInitialDate: YES,
            showDatePicker: YES,
            showTimePicker: YES
        });
    }

});
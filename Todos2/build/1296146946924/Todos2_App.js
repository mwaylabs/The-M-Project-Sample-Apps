// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: �2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      04.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

Todos2.Note = M.Model.create({

    __name__: 'Note',

    usesValidation: NO,

    title: M.Model.attr('String', {
        isRequired: YES,
        defaultValue: ''
    }),

    text: M.Model.attr('String', {
        isRequired: YES,
        defaultValue: ''
    }),

    date: M.Model.attr('Date', {
        defaultValue: ''
    })

}, M.LocalStorageProvider);Todos2.LanguageController = M.Controller.extend({

    languages: null,

    init: function() {

        M.ViewManager.getView('page3', 'langSelection').setSelection(M.Application.currentLanguage);

    },

    success: function(data) {

    },

    changeLanguage: function() {

        var language = M.ViewManager.getView('page3', 'langSelection').getSelection();
        M.LoaderView.show();
        M.I18N.setLanguage(language);

    }

});// ==========================================================================
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

    hide: function() {
        if(!M.ViewManager.getView('subpage1', 'toggleView').isInFirstState) {
            M.ViewManager.getView('subpage1', 'content').toggleView();
            M.ViewManager.getView('subpage1', 'toggleView').toggleView();
        }
    },

    addTodo: function() {
        if(!M.ViewManager.getView('page2', 'form1').validate()) {
            if(M.Validator.validationErrors) {
                M.ViewManager.getView('page2', 'form1').showErrors();
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
            onOk: {
                target: this,
                action: 'doDelete'
            },
            onCancel: {
                target: this,
                action: 'cancelDelete'
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
            onOk: {
                target: this,
                action: 'doDeleteFromSubView'
            },
            onCancel: {
                target: this,
                action: 'cancelDelete'
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
                M.ViewManager.getView('subpage1', 'form2').showErrors();
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
    }

});Todos2.tabs = M.TabBarView.design({

    childViews: 'tabItem1 tabItem2 tabItem3',

    anchorLocation: M.BOTTOM,

    transition: M.TRANSITION.NONE,

    name: 'tabbar1',

    tabItem1: M.TabBarItemView.design({

        value: M.I18N.l('tab_list'),
        page: 'page1',
        icon: 'notepad',
        isActive: YES

    }),

    tabItem2: M.TabBarItemView.design({

        value: M.I18N.l('tab_new'),
        page: 'page2',
        icon: 'todo'

    }),

    tabItem3: M.TabBarItemView.design({

        value:  M.I18N.l('tab_settings'),
        page: 'page3',
        icon: 'settings'

    })

})// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: �2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      04.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

Todos2.TodoItemView = M.ListItemView.design({

    target: Todos2.TodoController,

    action: 'showDetails',

    childViews: 'title text date',

    title : M.LabelView.design({
        valuePattern: '<%= title %>'
    }),

    text : M.LabelView.design({
        valuePattern: '<%= text %>',
        cssClass: 'listText'
    }),

    date : M.LabelView.design({
        computedValue: {
            valuePattern: '<%= date %>',
            operation: function(date, label) {
                return M.I18N.l('due_date') + ': ' + date.format(M.I18N.l('due_date_format'));
            }
        },
        cssClass: 'listDate'
    })    

});// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: Todos2 
// ==========================================================================

var Todos2  = Todos2 || {};

Todos2.app = M.Application.design({
    page1: M.PageView.design({

                    cssClass: 'bg',

                    onLoad: {
                        target: Todos2.TodoController,
                        action: 'init'
                    },

                    childViews: 'header content tabs',

                    header: M.ToolbarView.design({
                        childViews: 'centerLabel toggleView',

                        toggleView: M.ToggleView.design({
                            childViews: 'button1 button2',
                            anchorLocation: M.RIGHT,
                            toggleOnClick: YES,

                            button1: M.ButtonView.design({
                                value: M.I18N.l('edit'),
                                target: Todos2.TodoController,
                                action: 'edit',
                                icon: 'gear'
                            }),

                            button2: M.ButtonView.design({
                                value: M.I18N.l('save'),
                                target: Todos2.TodoController,
                                action: 'edit',
                                icon: 'check'
                            })
                        }),

                        centerLabel: M.LabelView.design({
                            value: 'Todos',
                            anchorLocation: M.CENTER
                        }),

                        anchorLocation: M.TOP
                    }),

                    content: M.ScrollView.design({

                        /* order in childViews string defines render order*/
                        childViews: 'todoList',

                        todoList: M.ListView.design({
                            contentBinding: 'Todos2.TodoController.todos',
                            listItemTemplateView: Todos2.TodoItemView
                        })

                    }),

                    tabs: Todos2.tabs

                }),

                subpage1: M.PageView.design({

                    cssClass: 'bg',

                    onHide: {
                        target: Todos2.TodoController,
                        action: 'hide'
                    },

                    childViews: 'header content tabs',

                    header: M.ToolbarView.design({
                        childViews: 'centerLabel toggleView',

                        showBackButton: YES,

                        toggleView: M.ToggleView.design({
                            childViews: 'button1 button2',
                            anchorLocation: M.RIGHT,

                            button1: M.ButtonView.design({
                                value: M.I18N.l('edit'),
                                target: Todos2.TodoController,
                                action: 'editItem',
                                icon: 'gear'
                            }),

                            button2: M.ButtonView.design({
                                value: M.I18N.l('save'),
                                target: Todos2.TodoController,
                                action: 'saveTodo',
                                icon: 'check'
                            })
                        }),

                        centerLabel: M.LabelView.design({
                            contentBinding: 'Todos2.TodoController.selTitle',
                            anchorLocation: M.CENTER
                        }),

                        anchorLocation: M.TOP
                    }),

                    content: M.ToggleView.design({

                        childViews: 'content1 content2',

                        content1: M.ScrollView.design({

                            childViews: 'titleLabel title textLabel text dateLabel date',

                            titleLabel: M.LabelView.design({
                                value: M.I18N.l('title'),
                                cssClass: 'detailsLabel'
                            }),

                            title: M.LabelView.design({
                                contentBinding: 'Todos2.TodoController.selTitle',
                                cssClass: 'details'
                            }),

                            textLabel: M.LabelView.design({
                                value: M.I18N.l('details'),
                                cssClass: 'detailsSpacer detailsLabel'
                            }),

                            text: M.LabelView.design({
                                contentBinding: 'Todos2.TodoController.selText',
                                cssClass: 'details'
                            }),

                            dateLabel: M.LabelView.design({
                                value: M.I18N.l('due_date'),
                                cssClass: 'detailsSpacer detailsLabel'
                            }),

                            date: M.LabelView.design({
                                contentBinding: 'Todos2.TodoController.selDateFormat',
                                cssClass: 'details'
                            })

                        }),

                        content2: M.ScrollView.design({

                            childViews: 'form2 del',

                            form2: M.FormView.design({

                                childViews: 'title text date',

                                showAlertDialogOnError: YES,

                                alertTitle: M.I18N.l('error'),

                                title: M.TextFieldView.design({
                                    name: 'title',
                                    label: M.I18N.l('title'),
                                    validators: [M.PresenceValidator.customize({
                                        msg: M.I18N.l('title_req')
                                    })],
                                    cssClassOnError: 'error',
                                    contentBinding: 'Todos2.TodoController.selTitle',
                                    cssClass: 'todos_form'
                                }),

                                text: M.TextFieldView.design({
                                    hasMultipleLines: YES,
                                    name: 'text',
                                    label: M.I18N.l('details'),
                                    validators: [M.PresenceValidator.customize({
                                        msg: M.I18N.l('details_req')
                                    })],
                                    cssClassOnError: 'error',
                                    contentBinding: 'Todos2.TodoController.selText',
                                    cssClass: 'todos_form'
                                }),

                                date: M.TextFieldView.design({
                                    name: 'date',
                                    label: M.I18N.l('due_date'),
                                    initialText: M.I18N.l('due_date_format'),
                                    cssClassOnInit: 'textfieldInit',
                                    validators: [M.PresenceValidator.customize({
                                        msg: M.I18N.l('due_date_req')
                                    }), M.DateValidator.customize({
                                        msg: M.I18N.l('due_date_invalid')
                                    })],
                                    cssClassOnError: 'error',
                                    contentBinding: 'Todos2.TodoController.selDate',
                                    cssClass: 'todos_form'
                                })

                            }),

                            del: M.ButtonView.design({
                                value: M.I18N.l('delete'),
                                cssClass: 'b',
                                target: Todos2.TodoController,
                                action: 'remove'
                            })

                        })

                    }),

                    tabs: Todos2.tabs

                }),

                page2: M.PageView.design({

                    cssClass: 'bg',

                    childViews: 'header content tabs',

                    header: M.ToolbarView.design({
                        childViews: 'centerLabel addButton',

                        addButton: M.ButtonView.design({
                            value: M.I18N.l('add'),
                            target: Todos2.TodoController,
                            action: 'addTodo',
                            icon: 'plus',
                            anchorLocation: M.RIGHT
                        }),

                        centerLabel: M.LabelView.design({
                            value: 'Todos',
                            anchorLocation: M.CENTER
                        }),

                        anchorLocation: M.TOP
                    }),

                    content: M.ScrollView.design({

                        childViews: 'form1',

                        form1: M.FormView.design({

                            childViews: 'title text date',

                            showAlertDialogOnError: YES,

                            alertTitle: M.I18N.l('error'),

                            title: M.TextFieldView.design({
                                name: 'title',
                                label: M.I18N.l('title'),
                                validators: [M.PresenceValidator.customize({
                                    msg: M.I18N.l('title_req')
                                })],
                                cssClassOnError: 'error',
                                cssClass: 'todos_form'
                            }),

                            text: M.TextFieldView.design({
                                hasMultipleLines: YES,
                                name: 'text',
                                label: M.I18N.l('details'),
                                validators: [M.PresenceValidator.customize({
                                    msg: M.I18N.l('details_req')
                                })],
                                cssClassOnError: 'error',
                                cssClass: 'todos_form'
                            }),

                            date: M.TextFieldView.design({
                                name: 'date',
                                label: M.I18N.l('due_date'),
                                initialText: M.I18N.l('due_date_format'),
                                cssClassOnInit: 'textfieldInit',
                                validators: [M.PresenceValidator.customize({
                                    msg: M.I18N.l('due_date_req')
                                }), M.DateValidator.customize({
                                    msg: M.I18N.l('due_date_invalid')
                                })],
                                cssClassOnError: 'error',
                                cssClass: 'todos_form'
                            })

                        })

                    }),

                    tabs: Todos2.tabs

                }),

                page3: M.PageView.design({

                    cssClass: 'bg',

                    childViews: 'header content tabs',

                    onLoad: {
                        target: Todos2.LanguageController,
                        action: 'init'
                    },

                    header: M.ToolbarView.design({

                        value: M.I18N.l('settings'),

                        anchorLocation: M.TOP
                    }),

                    content: M.ScrollView.design({

                        childViews: 'langSelection contactHeader contactText contactMail contactUrl',

                        langSelection: M.SelectionListView.design({

                            childViews: 'item1 item2 item3 item4 item5 item6',

                            selectionMode: M.SINGLE_SELECTION,

                            label: M.I18N.l('language'),

                            name: 'language',

                            onSelect: {
                                target: Todos2.LanguageController,
                                action: 'changeLanguage'
                            },

                            item1: M.SelectionListItemView.design({

                                label: M.I18N.l('german'),
                                value: 'de_de'

                            }),

                            item2: M.SelectionListItemView.design({

                                label: M.I18N.l('english'),
                                value: 'en_us'

                            }),

                            item3: M.SelectionListItemView.design({

                                label: M.I18N.l('spanish'),
                                value: 'es_es'

                            }),

                            item4: M.SelectionListItemView.design({

                                label: M.I18N.l('portuguese'),
                                value: 'pt_br'

                            }),

                            item5: M.SelectionListItemView.design({

                                label: M.I18N.l('chinese-simple'),
                                value: 'zh_cn'

                            }),

                            item6: M.SelectionListItemView.design({

                                label: M.I18N.l('chinese-traditional'),
                                value: 'zh_tw'

                            })

                        }),

                        contactHeader: M.LabelView.design({

                            value: M.I18N.l('contact'),

                            cssClass: 'label'

                        }),

                        contactText: M.LabelView.design({

                            value: M.I18N.l('contactText'),

                            cssClass: 'contactText'

                        }),

                        contactMail: M.LabelView.design({

                            value: 'info@mwaysolutions.com',

                            hyperlinkType: M.HYPERLINK_EMAIL,

                            hyperlinkTarget: 'info@mwaysolutions.com'

                        }),

                        contactUrl: M.LabelView.design({

                            value: 'www.mwaysolutions.com',

                            hyperlinkType: M.HYPERLINK_WEBSITE,

                            hyperlinkTarget: 'http://www.mwaysolutions.com/'

                        })

                    }),

                    tabs: Todos2.tabs

                })

            });
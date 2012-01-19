// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: Todos
// View: NewItemPage
// ==========================================================================

m_require('app/views/tabs.js');

Todos.NewItemPage = M.PageView.design({

    events: {
        pageshow: {
            target: Todos.NewItemController,
            action: 'init'
        }
    },

    childViews: 'header content tabs',

    header: M.ToolbarView.design({
        value: M.I18N.l('tab_new'),
        anchorLocation: M.TOP
    }),

    content: M.ScrollView.design({
        childViews: 'form1',
        
        form1: M.FormView.design({
            childViews: 'title text date button',
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
                validators: [M.PresenceValidator.customize({
                    msg: M.I18N.l('due_date_req')
                })],
                cssClassOnError: 'error',
                cssClass: 'todos_form',
                inputType: M.INPUT_DATETIME
            }),

            button: M.ButtonView.design({
                value: M.I18N.l('add'),
                cssClass: 'b',
                events: {
                    tap: {
                        target: Todos.NewItemController,
                        action: 'addTodo'
                    }
                }
            })
        })
    }),

    tabs: Todos.Tabs

});


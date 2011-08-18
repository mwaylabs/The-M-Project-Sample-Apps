// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: Todos
// View: ListPage
// ==========================================================================

m_require('app/views/tabs.js');
m_require('app/views/todoItem.js');

Todos.ListPage = M.PageView.design({

    events: {
        pageshow: {
            target: Todos.ListController,
            action: 'init'
        }
    },

    childViews: 'header content tabs',

    header: M.ToolbarView.design({
        value: M.I18N.l('tab_list'),
        anchorLocation: M.TOP
    }),

    content: M.ScrollView.design({
        childViews: 'todoList',
        todoList: M.ListView.design({
            contentBinding: {
                target: Todos.ListController,
                property: 'notes'
            },
            listItemTemplateView: Todos.TodoItem
        })
    }),

    tabs: Todos.Tabs

});


// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: Todos
// View: Tabs
// ==========================================================================

Todos.Tabs = M.TabBarView.design({

    childViews: 'listTab newItemTab settingsTab',

    anchorLocation: M.BOTTOM,

    transition: M.TRANSITION.NONE,

    name: 'tabs',

    listTab: M.TabBarItemView.design({

        value: M.I18N.l('tab_list'),
        page: 'listPage',
        icon: 'notepad',
        isActive: YES

    }),

    newItemTab: M.TabBarItemView.design({

        value: M.I18N.l('tab_new'),
        page: 'newItemPage',
        icon: 'todo'

    }),

    settingsTab: M.TabBarItemView.design({

        value:  M.I18N.l('tab_settings'),
        page: 'settingsPage',
        icon: 'settings'

    })

});


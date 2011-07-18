// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso
//
// Project: StoreSample
// View: tabs
// ==========================================================================

StoreSample.Tabs = M.TabBarView.design({

    childViews: 'tabCreate tabRead tabUpdate tabDelete ',

    anchorLocation: M.BOTTOM,

    tabCreate: M.TabBarItemView.design({
        value: 'C',
        page: 'createPage'
    }),

    tabRead: M.TabBarItemView.design({
        value: 'R',
        page: 'readPage'
    }),

    tabUpdate: M.TabBarItemView.design({
        value: 'U',
        page: 'updatePage'
    }),

    tabDelete: M.TabBarItemView.design({
        value: 'D',
        page: 'deletePage'
    })

});


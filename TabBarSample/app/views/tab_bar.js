TabBarSample.TabBar = M.TabBarView.design({

    childViews: 'tab1 tab2 tab3',

    anchorLocation: M.BOTTOM,

    tab1: M.TabBarItemView.design({

        value: 'Tab 1',
        page: 'page1'

    }),

    tab2: M.TabBarItemView.design({

        value: 'Tab 2',
        page: 'page2'

    }),

    tab3: M.TabBarItemView.design({

        value: 'Tab 3',
        page: 'page3'

    })

});
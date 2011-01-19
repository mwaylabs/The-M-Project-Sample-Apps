m_require('app/views/tab_bar.js');

TabBarSample.SecondPageView = M.PageView.design({

    onLoad: {

        target: TabBarSample.SecondPageController,

        action: 'init'

    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        value: 'Page 2'

    }),

    content: M.ScrollView.design({



    }),

    tabBar: TabBarSample.TabBar

});
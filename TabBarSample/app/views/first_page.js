m_require('app/views/tab_bar.js');

TabBarSample.FirstPageView = M.PageView.design({

    events: {

        pageshow: {

            target: TabBarSample.FirstPageController,

            action: 'init'
        }

    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        value: 'Page 1'

    }),

    content: M.ScrollView.design({



    }),

    tabBar: TabBarSample.TabBar

});
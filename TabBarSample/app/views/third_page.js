m_require('app/views/tab_bar.js');

TabBarSample.ThirdPageView = M.PageView.design({

    events: {

        pageshow: {

            target: TabBarSample.ThirdPageController,

            action: 'init'
        }

    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        value: 'Page 3'

    }),

    content: M.ScrollView.design({

        

    }),

    tabBar: TabBarSample.TabBar

});
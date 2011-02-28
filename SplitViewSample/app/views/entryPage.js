// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.9-pre
//
// Project: SplitViewSample
// Page: entryPage
// ==========================================================================

m_require('app/views/my_list_item_view.js');
m_require('app/views/page1.js');
m_require('app/views/page2.js');
m_require('app/views/page3.js');

SplitViewSample.entryPage = M.PageView.design({
    onLoad: {
        target: SplitViewSample.MyController,
        action: 'init'
    },

    childViews: 'header splitview footer',

    header: M.SplitToolbarView.design({

        childViews: 'header1 header2',

        showSelectedItemInMainHeader: YES,

        showMenuButtonInPortraitMode: YES,

        header1: M.ToolbarView.design({

            value: 'Menu',

            anchorLocation: M.TOP

        }),

        header2: M.ToolbarView.design({

            value: 'DETAIL',

            anchorLocation: M.TOP

        })

    }),

    splitview: M.SplitView.design({

        childViews: 'item1 item2 item3',

        value: 'Test',

        item1: M.SplitItemView.design({

            value: 'Item1',
            view: SplitViewSample.ContentPage1,
            isActive: YES

        }),

        item2: M.SplitItemView.design({

            value: 'Item2',
            view: SplitViewSample.ContentPage2

        }),

        item3: M.SplitItemView.design({

            value: 'Item3',
            view: SplitViewSample.ContentPage3

        })

        /*contentBinding: 'SplitViewSample.MyController.menu'*/

    }),

    footer: M.ToolbarView.design({

        value: 'Footer',

        isFixed: NO,

        anchorLocation: M.BOTTOM

    })
});


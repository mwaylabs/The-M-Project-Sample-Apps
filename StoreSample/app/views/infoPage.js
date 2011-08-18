// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: StoreSample
// View: InfoPage
// ==========================================================================

m_require('app/views/listTemplate.js');

StoreSample.InfoPage = M.PageView.design({

    childViews: 'header content',

    header: M.ToolbarView.design({

        childViews: 'title infoButton',

        anchorLocation: M.TOP,

        title: M.LabelView.design({
            value: 'Store Sample',
            anchorLocation: M.CENTER
        }),

        infoButton: M.ButtonView.design({
            isIconOnly: YES,
            icon: 'back',
            anchorLocation: M.RIGHT,
            events: {
                tap: {
                    target: StoreSample.NavigationController,
                    action: 'goBack'
                }
            }
        })

    }),

    content: M.ScrollView.design({
        childViews: 'list',
        list: M.ListView.design({
            isDividedList: YES,
            listItemTemplateView: StoreSample.ListTemplate,
            contentBinding: {
                target: StoreSample.ListController,
                property: 'items'
            }
        })
    })

});
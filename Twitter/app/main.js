// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: Twitter 
// ==========================================================================

var Twitter  = Twitter || {};

Twitter.app = M.Application.design({

    page1: M.PageView.design({

            childViews: 'header content',

            header: M.ToolbarView.design({
                value: 'Twitter Demo',
                anchorLocation : M.TOP
            }),

            content: M.ScrollView.design({

                childViews: 'searchField button label',

                searchField: M.TextFieldView.design({
                    initialText: 'search term...',
                    cssClassOnInit: 'textfieldInit',
                    target: Twitter.TwitterController,
                    action: 'search',
                    triggerActionOnEnter: YES,
                    isGrouped: NO
                }),

                button: M.ButtonView.design({
                    value: 'Search',
                    target: Twitter.TwitterController,
                    action: 'search'
                }),

                label: M.LabelView.design({

                    value: '&#160;'

                })
                
            })
        
    }),

    page2: M.PageView.design({
        childViews: 'header content',

        header: M.ToolbarView.design({
            value: 'Twitter Demo',
            contentBinding: 'Twitter.TwitterController.searchString',
            anchorLocation : M.TOP,
            showBackButton: YES
        }),

        content: M.ScrollView.design({
            childViews: 'list1',

            list1: M.ListView.design({
                contentBinding: 'Twitter.TwitterController.results',
                items: 'results',
                listItemTemplateView: Twitter.TwitterResultsView,
                removeItemsOnUpdate: YES
            })
        })
    }),

    page3: M.PageView.design({
        childViews: 'header content',

        header: M.ToolbarView.design({
            value: 'Twitter Demo',
            contentBinding: 'Twitter.TwitterController.username',
            anchorLocation : M.TOP,
            showBackButton: YES
        }),

        content: M.ScrollView.design({
            childViews: 'list1',

            list1: M.ListView.design({
                contentBinding: 'Twitter.TwitterController.userResults',
                items: 'results',
                listItemTemplateView: Twitter.TwitterUserView,
                removeItemsOnUpdate: YES
            })
        })
    })

});
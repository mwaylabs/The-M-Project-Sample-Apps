// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: Twitter 
// ==========================================================================

var Twitter  = Twitter || {};

Twitter.app = M.Application.design({

    entryPage: 'page1',

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
                    isGrouped: NO,
                    events: {
                        enter: {
                            target: Twitter.TwitterController,
                            action: 'search'
                        }
                    }
                }),

                button: M.ButtonView.design({
                    value: 'Search',
                    events: {
                        tap: {
                            target: Twitter.TwitterController,
                            action: 'search'
                        }
                    }

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
            contentBinding: {
                target: Twitter.TwitterController,
                property: 'searchString'
            },
            anchorLocation : M.TOP,
            showBackButton: YES
        }),

        content: M.ScrollView.design({
            childViews: 'list1',

            list1: M.ListView.design({
                contentBinding: {
                    target: Twitter.TwitterController,
                    property: 'results'
                },
                listItemTemplateView: Twitter.TwitterResultsView,
                removeItemsOnUpdate: YES
            })
        })
    }),

    page3: M.PageView.design({
        childViews: 'header content',

        header: M.ToolbarView.design({
            value: 'Twitter Demo',
            contentBinding: {
                target: Twitter.TwitterController,
                property: 'username'
            },
            anchorLocation : M.TOP,
            showBackButton: YES
        }),

        content: M.ScrollView.design({
            childViews: 'list1',

            list1: M.ListView.design({
                contentBinding: {
                    target: Twitter.TwitterController,
                    property: 'userResults'
                },
                listItemTemplateView: Twitter.TwitterUserView,
                removeItemsOnUpdate: YES
            })
        })
    })

});
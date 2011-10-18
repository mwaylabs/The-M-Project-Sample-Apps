// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.6
//
// Project: Twitter2
// ==========================================================================

var Twitter2  = Twitter2 || {};

Twitter2.app = M.Application.design({

    entryPage: 'page1',

    page1: M.PageView.design({

            childViews: 'header content',
    
            header: M.ToolbarView.design({
                value: 'Twitter Demo 2',
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
                            target: Twitter2.TwitterController,
                            action: 'search'
                        }
                    }
                }),

                button: M.ButtonView.design({
                    value: 'Search',
                    events: {
                        tap: {
                            target: Twitter2.TwitterController,
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
            value: 'Twitter Demo 2',
            contentBinding: {
                target: Twitter2.TwitterController,
                property: 'searchString'
            },
            anchorLocation : M.TOP,
            showBackButton: YES
        }),

        content: M.ScrollView.design({
            childViews: 'list1',

            list1: M.ListView.design({
                contentBinding: {
                    target: Twitter2.TwitterController,
                    property: 'results'
                },
                listItemTemplateView: Twitter2.TwitterResultsView,
                removeItemsOnUpdate: YES
            })
        })
    }),

    page3: M.PageView.design({
        childViews: 'header content',

        header: M.ToolbarView.design({
            value: 'Twitter Demo 2',
            contentBinding: {
                target: Twitter2.TwitterController,
                property: 'username'
            },
            anchorLocation : M.TOP,
            showBackButton: YES
        }),

        content: M.ScrollView.design({
            childViews: 'list1',

            list1: M.ListView.design({
                contentBinding: {
                    target: Twitter2.TwitterController,
                    property: 'userResults'
                },
                listItemTemplateView: Twitter2.TwitterUserView,
                removeItemsOnUpdate: YES
            })
        })
    })

});
// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.8-1
//
// Project: BlackBerrySample 
// ==========================================================================

var BlackBerrySample  = BlackBerrySample || {};

M.Application.useTransitions = NO;

BlackBerrySample.app = M.Application.design({

    entryPage : 'page1',

    page1: M.PageView.design({

        childViews: 'header content',

        header: M.ToolbarView.design({

            value: 'BlackBerry Sample'

        }),

        content: M.ScrollView.design({

            childViews: 'label list',

            label: M.LabelView.design({

                value: 'This sample app shows how to use the \'applyTheme\' property to use native controls such as the select list. This is a convenient way for improving the performance of an application. For example there are some performance issues with the M.SelectionListView in the \'SINGLE_SELECTION_DIALOG\' mode on BlackBerry OS 6.0 devices. To solve this problem respectively to improve the performance, we let BlackBerry OS 6.0 render and use its own, native select menu.'

            }),

            list: M.SelectionListView.design({

                childViews: 'item1 item2 item3 item4 item5 item6',

                selectionMode: M.SINGLE_SELECTION_DIALOG,

                applyTheme: YES,

                item1: M.SelectionListItemView.design({

                    value: 'item1',

                    label: 'Item 1'

                }),

                item2: M.SelectionListItemView.design({

                    value: 'item2',

                    label: 'Item 2'

                }),

                item3: M.SelectionListItemView.design({

                    value: 'item3',

                    label: 'Item 3'

                }),

                item4: M.SelectionListItemView.design({

                    value: 'item4',

                    label: 'Item 4'

                }),

                item5: M.SelectionListItemView.design({

                    value: 'item5',

                    label: 'Item 5'

                }),

                item6: M.SelectionListItemView.design({

                    value: 'item6',

                    label: 'Item 6'

                })

            })

        })

    })

});